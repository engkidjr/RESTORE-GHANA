const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const apiKey = "AIzaSyDdY6aHy7RMLf1t9OVXeyey8HcbE82bRto";
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // There isn't a direct listModels in the SDK easily accessible without an authenticated client
    // but we can try to hit an endpoint or just try a few model names.
    // Actually, let's try a direct fetch to the Google API.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Available Models:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

listModels();
