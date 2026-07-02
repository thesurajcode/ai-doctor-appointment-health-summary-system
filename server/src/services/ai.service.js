const axios = require("axios");

const generateSummary = async (notes) => {
  const response = await axios.post(
    "http://127.0.0.1:5001/generate-summary",
    {
      notes,
    }
  );

  return response.data;
};

module.exports = {
  generateSummary,
};