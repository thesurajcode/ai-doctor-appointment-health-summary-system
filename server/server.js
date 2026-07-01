require("dotenv").config();

console.log("✅ server.js started");

const app = require("./src/app");

console.log("✅ app imported");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});