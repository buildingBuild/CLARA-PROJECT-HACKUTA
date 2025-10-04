import express from 'express'
import { GoogleGenAI } from "@google/genai";
const app = express()
const port = process.env.PORT
const googleKey = process.env.GOOGLE_AI_KEY


let pastChats = [
];

const prompt = {
    user_question: "Explain functions",
    gemini_AI_Response: ""
};

pastChats.push(prompt)

const question = "Explain functions Clara Im confused"


const systemPrompt = `System instructions : You are part of a system that helps C.L.A.R.A come to life. System cycle : {User sends a question which is processed by the Gemini API to generate text.The Eleven Labs API converts this text into a realistic mp3 sound.
The DI- D API uses the mp3 and text to create facial expressions.
Display captures a picture to assess user understanding, and data is synced.
Finally, a summary is sent to the user, and the system decides if a loop is necessary.} 
It all starts with you answering the question as a human in a nice thoughful way that when converted to speech sounds calm collected and empathethic. You will also have past chats and responses to help you keep track. if they are empty assume its a fresh question but if not take them into consideration. Keep it short and sweet for now
`;

const ai = new GoogleGenAI({ apiKey: googleKey });

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt} + ${pastChats} + ${question}`

    });
    console.log(response.text);
}

await main();

//console.log(prompt)


app.listen(port, () => console.log(`I AM RUNNING ON ${port} and testing env files`))