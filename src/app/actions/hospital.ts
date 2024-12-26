"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function addDoctorToHospital({
  payload,
}: {
  payload: { doctorID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "http://localhost:8000/hospital/add-doc",
      {
        doctorID: payload.doctorID,
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

export async function removeDoctorFromHospital({
  payload,
}: {
  payload: { doctorID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "http://localhost:8000/hospital/remove-doc",
      {
        doctorID: payload.doctorID,
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

export async function assignDoctorToPatient({
  payload,
}: {
  payload: { doctorID: string; patientID: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "http://localhost:8000/hospital/assign-doc",
      {
        doctorID: payload.doctorID,
        patientID: payload.patientID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: cookiesStore.toString(),
        },
      },
    );
    if (res.status === 200 || res.status === 201) {
      return { success: true };
    } else return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function addSensorToHospital({
  payload,
}: {
  payload: { macAddress: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "http://localhost:8000/hospital/create-sensor",
      {
        macAddress: payload.macAddress,
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

export async function assignSensorToPatient({
  payload,
}: {
  payload: { macAddress: string };
}) {
  const cookiesStore = await cookies();
  try {
    const res = await axios.post(
      "http://localhost:8000/hospital/assign-sensor",
      {
        macAddress: payload.macAddress,
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
