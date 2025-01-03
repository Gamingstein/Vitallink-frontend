"use server";
import { RegisterPatientSchema } from "@/lib/definations";
import axios from "axios";
import { cookies } from "next/headers";

export type FormState =
  | {
      errors?: {
        name?: string[];
        age?: string[];
        gender?: string[];
        aadhaar?: string[];
        sensorID?: string[];
      };
      message?: string;
    }
  | undefined;

export async function registerPatient(state: FormState, formData: FormData) {
  const cookiesStore = await cookies();
  const validatedFields = RegisterPatientSchema.safeParse({
    name: formData.get("name"),
    age: parseInt(formData.get("age") as string),
    gender: (formData.get("gender") as string).toUpperCase(),
    aadhaar: parseInt(formData.get("aadhaar") as string),
    sensorID: formData.get("sensorID"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = validatedFields.data;
  const res = await axios.post(
    "https://vitallinkql.onrender.com/hospital/create-patient",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        cookie: cookiesStore.toString(),
      },
    },
  );
  // console.log(res.data);
  return { success: res.data?.success };
}

export async function dischargePatient({
  payload,
}: {
  payload: { patientID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "https://vitallinkql.onrender.com/hospital/discharge-patient",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesStore.toString(),
        },
      },
    );
    return { success: res.data?.success };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removePatient({
  payload,
}: {
  payload: { patientID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "https://vitallinkql.onrender.com/hospital/remove-patient",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesStore.toString(),
        },
      },
    );
    return { success: res.data?.success };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
