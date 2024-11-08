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
    aadhaar: formData.get("aadhaar"),
    sensorID: formData.get("sensorID"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = validatedFields.data;
  const res = await axios.post(
    "http://localhost:8000/hospital/create-patient",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        cookie: cookiesStore.toString(),
      },
    }
  );
  console.log(res.data);
}

export async function dischargePatient() {}
