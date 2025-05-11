"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function addPatientToDoctor({
  payload,
}: {
  payload: { aadhaar: string; hospitalID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "https://vitallinkql.onrender.com/doctor/add-patient",
      {
        aadhaar: payload.aadhaar,
        hospitalID: payload.hospitalID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesStore.toString(),
        },
      },
    );
    if (res.status === 200 || res.status === 201) return { success: true };
    else return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removePatientFromDoctor({
  payload,
}: {
  payload: { patientID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "https://vitallinkql.onrender.com/doctor/remove-patient",
      {
        patientID: payload.patientID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesStore.toString(),
        },
      },
    );
    if (res.status === 200 || res.status === 201) return { success: true };
    else return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
