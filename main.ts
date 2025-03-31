// main.ts
import OpenAI from "openai";

// set OPENAI_API_KEY in environment, or pass it in arguments
const openai = new OpenAI();

openai.chat.completions
  .create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Write a haiku." }],
  })
  .then((response) => {
    console.log(response.choices[0].message.content);
  })
  .then(() => new Promise((resolve) => setTimeout(resolve, 6000)));
