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
  const validatedFields = SignupFormSchema.safeParse(
    Object.fromEntries(formData),
  );
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

  const res = await axios.post(
    "https://vitallinkql.onrender.com/user/register",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  redirect(res.status === 201 ? "/auth/login" : "/auth/signup");
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData),
  );
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await axios.post(
    "https://vitallinkql.onrender.com/user/login",
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
  }
  redirect("/dashboard");
}

export async function logout() {
  const cookiesStore = await cookies();
  const res = await axios.get("https://vitallinkql.onrender.com/user/logout", {
    headers: {
      cookie: cookiesStore.toString(),
    },
  });
  if (res.status === 200) {
    cookiesStore.delete("accessToken");
    cookiesStore.delete("refreshToken");
  }
  redirect("/home");
}

export async function getCurrentUser() {
  const cookiesStore = await cookies();
  if (!cookiesStore.has("accessToken")) {
    return { user: null, error: "No access token found" };
  }
  try {
    const res = await axios.get("https://vitallinkql.onrender.com/user/me", {
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
