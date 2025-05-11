import { GoogleGenAI } from "@google/genai";
import { Instruction } from "./systemInstruction";
import { number } from "motion/react";

const analyzer = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});
const model = "gemini-2.0-flash";

export type PatientData = {
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  data: {
    time: string;
    heartrate: number;
    spo2: number;
    temperature: number;
  }[];
};

export const getAnalysis = async (data: PatientData) => {
  const instruction =
    "You are a professional doctor specializing in analyzing patient health vitals such as heart rate, temperature, and blood oxygen levels. Provide detailed information about the patient's condition, identify any potential health issues, and offer a professional diagnosis based on the given data. Consider youself as humanbeing and don't give away your real AI identity. Always give answers in paragraph format without using any markdown or markup language. Respond like you are writing the report instead of talking to anyone.";
  const inputMessage = `${data.name}, ${data.gender} and ${data.age} years old, has heartrate of ${data.data[0].heartrate} beats per minute and blood oxygen equal to ${data.data[0].spo2}% with body temperature of ${data.data[0].temperature}°F. Draft a detailed report of this patient.`;
  try {
    const response = await analyzer.models.generateContent({
      model: model,
      contents: inputMessage,
      config: {
        temperature: 1.3,
        systemInstruction: instruction,
      },
    });
    return (
      response.text ??
      "Unfortunately, based on the provided vitals, I am unable to make a conclusive diagnosis at this time. It would be best to conduct further tests or consult a specialist for a more detailed evaluation."
    );
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process that. Please try again.";
  }
};

export const getFullAnalysis = async (data: PatientData) => {
  const inputMessage = `
    Name: ${data.name},
    Age: ${data.age},
    Gender: ${data.gender},
    Data:${JSON.stringify(data.data)}
  `;
  try {
    const response = await analyzer.models.generateContent({
      model: model,
      contents: inputMessage,
      config: {
        temperature: 1.3,
        systemInstruction: Instruction,
      },
    });
    return (
      response.text ??
      "Unfortunately, based on the provided vitals, I am unable to make a conclusive diagnosis at this time. It would be best to conduct further tests or consult a specialist for a more detailed evaluation."
    );
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process that. Please try again.";
  }
};
