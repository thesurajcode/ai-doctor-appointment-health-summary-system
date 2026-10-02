const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Direct Google Gemini API Call (Fast, reliable, zero cold-start)
const generateSummaryWithGemini = async (notes) => {
  const prompt = `
You are an experienced medical assistant.

Your task is to convert the doctor's notes into a simple, patient-friendly health summary.

Follow these rules strictly:

1. Explain everything in simple English that a common person can understand.
2. Do not use complex medical terms unless necessary.
3. Do not diagnose any disease that is not mentioned in the doctor's notes.
4. Do not add medicines that are not prescribed by the doctor.
5. If any section is not mentioned in the doctor's notes, write "Not Mentioned".
6. Keep the response clear, short, and well-structured.

Return the response in the following format exactly:

# 🩺 Health Summary

## Diagnosis
Explain the patient's condition in simple language.

## Medicines
- List each medicine as bullet points.
- Mention dosage and duration if available.

## Diet & Hydration
Mention what the patient should eat or drink if available.
If not mentioned, write "Not Mentioned".

## Lifestyle Advice
List the doctor's advice as bullet points.

## When to Contact the Doctor
Mention warning signs or when the patient should seek medical attention.
If not mentioned, advise the patient to contact the doctor if symptoms worsen or do not improve.

## Disclaimer
This summary is AI-generated for educational purposes and does not replace professional medical advice. Always follow your doctor's instructions.

Doctor's Notes:
${notes}
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const response = await axios.post(
    url,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 15000,
    }
  );

  const summary = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!summary) {
    throw new Error("No summary generated from Gemini");
  }

  return {
    success: true,
    summary,
  };
};

// Fallback to Python microservice if needed
const generateSummaryWithPythonService = async (notes) => {
  if (!AI_SERVICE_URL) {
    throw new Error("AI_SERVICE_URL is not configured");
  }

  const response = await axios.post(
    `${AI_SERVICE_URL}/generate-summary`,
    {
      notes,
    },
    {
      timeout: 60000, // 60s timeout for cold start
    }
  );

  return response.data;
};

// Main generator: Direct Gemini first, Python microservice fallback
const generateSummary = async (notes) => {
  // 1. Try Direct Google Gemini Call (1-2 seconds, no cold start)
  if (GEMINI_API_KEY) {
    try {
      console.log("⚡ Generating AI summary directly via Google Gemini...");
      const directResult = await generateSummaryWithGemini(notes);
      return directResult;
    } catch (directError) {
      console.warn(
        "⚠️ Direct Gemini call failed, attempting fallback to Python microservice:",
        directError.message
      );
    }
  }

  // 2. Fallback to Python microservice on Render
  console.log("🔄 Calling Python AI microservice on Render...");
  return await generateSummaryWithPythonService(notes);
};

module.exports = {
  generateSummary,
};