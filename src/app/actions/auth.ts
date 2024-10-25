"use server";
import { permanentRedirect } from "next/navigation";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/definations";
import axios from "axios";
import { cookies } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
  let redirectPath;
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    isAdmin: formData.get("isAdmin"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const payload = new FormData();
  const data = validatedFields.data;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      payload.append(key, data[key as keyof typeof data]);
    }
  }
  payload.append("name", `${data.firstname} ${data.lastname}`);
  payload.append("avatar", formData.get("avatar") as Blob);
  console.log("Validated fields", payload);
  const res = await axios.post("http://localhost:8000/user/register", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.status === 201) {
    redirectPath = "/auth/login";
  } else {
    redirectPath = "/auth/signup";
    console.log("error");
  }
  permanentRedirect(redirectPath);

  // Call the provider or db to create a user...
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  let redirectPath;
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await axios.post(
    "http://localhost:8000/user/login",
    validatedFields.data,
  );

  if (res.status === 200) {
    const cookiesStore = await cookies();
    const accessExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookiesStore.set("accessToken", res.data?.data.accessToken, {
      httpOnly: true,
      secure: true,
      expires: accessExpiresAt,
      sameSite: "none",
    });
    cookiesStore.set("refreshToken", res.data?.data.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: refreshExpiresAt,
      sameSite: "none",
    });
    redirectPath = "/home";
  } else {
    redirectPath = "/auth/login";
    console.log("error");
  }
  permanentRedirect(redirectPath);
}

export async function logout() {
  const cookiesStore = await cookies();
  const res = await axios.post(
    "http://localhost:8000/user/logout",
    { hello: "world" },
    {
      headers: {
        cookie: cookiesStore.toString(),
      },
    },
  );
  if (res.status === 200) {
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
  }
  permanentRedirect("/home");
}

export async function getCurrentUser() {
  const cookiesStore = await cookies();
  if (!cookiesStore.has("accessToken")) {
    return { user: null, error: "No access token found" };
  }
  try {
    const res = await axios.get("http://localhost:8000/user/me", {
      headers: {
        cookie: cookiesStore.toString(),
      },
    });
    if (res.status === 200) {
      return { user: res.data?.data, error: null };
    } else {
      return { user: null, error: res.data?.error || null };
    }
  } catch (error) {
    return { user: null, error: error };
  }
}
