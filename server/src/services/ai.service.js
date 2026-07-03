const axios = require("axios");

const AI_SERVICE_URL =
  process.env.AI_SERVICE_URL;

const generateSummary = async (notes) => {
  const response = await axios.post(
    `${AI_SERVICE_URL}/generate-summary`,
    {
      notes,
    }
  );

  return response.data;
};

module.exports = {
  generateSummary,
};