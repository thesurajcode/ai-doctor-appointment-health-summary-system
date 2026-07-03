from flask import Flask, request, jsonify
from services.gemini_service import generate_summary

app = Flask(__name__)

@app.route("/")
def home():
    return "AI Service Running..."

@app.route("/generate-summary", methods=["POST"])
def generate_summary_api():

    data = request.get_json()
    notes = data.get("notes")

    summary = generate_summary(notes)

    return jsonify({
        "success": True,
        "summary": summary
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)