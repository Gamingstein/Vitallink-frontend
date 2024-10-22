"use server";
import { redirect } from "next/navigation";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/definations";
import axios from "axios";
import { cookies } from "next/headers";

export async function signup(state: FormState, formData: FormData) {
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
      payload.append(key, data[key]);
    }
  }
  payload.append("fullName", `${data.firstname} ${data.lastname}`);
  payload.append("avatar", formData.get("avatar") as Blob);
  console.log("Validated fields", payload);
  const res = await axios.post(
    "http://localhost:8000/api/v1/users/register",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (res.status === 201) {
    redirect("/home");
  } else {
    console.log("error");
  }
  // Call the provider or db to create a user...
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
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
    "http://localhost:8000/api/v1/users/login",
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

    redirect("/home");
  } else {
    console.log("error");
  }
  // Call the provider or db to login a user...
}

export async function logout() {
  const cookiesStore = await cookies();
  const res = await axios.post(
    "http://localhost:8000/api/v1/users/logout",
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
    redirect("/auth/login");
  }
}

export async function getCurrentUser() {
  const cookiesStore = await cookies();
  try {
    const res = await axios.get(
      "http://localhost:8000/api/v1/users/current-user",
      {
        headers: {
          cookie: cookiesStore.toString(),
        },
      },
    );
    if (res.status === 200) {
      return res.data?.data?.user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
