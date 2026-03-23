const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  const apiKey = "AIzaSyDdY6aHy7RMLf1t9OVXeyey8HcbE82bRto";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Say hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

test();
