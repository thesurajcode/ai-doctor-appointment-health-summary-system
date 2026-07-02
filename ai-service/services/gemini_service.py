import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_summary(notes):

    prompt = f"""
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
    {notes}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text