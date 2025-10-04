import { GoogleGenAI } from "@google/genai";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import express from 'express'
const app = express()
const port = process.env.PORT
const googleKey = process.env.GOOGLE_AI_KEY
const elevenlabsKey = process.env.ELEVEN_LABS_KEY



// Male voice at index 0
const voice_ids = ["I3M3nb9pIAmagyf8aCSq", "dmDD8T933s9glsN800C3"]

let pastChats = [];
const prompt = {
    user_question: "what is a function in programming",
    gemini_AI_Response: ""
};
pastChats.push(prompt)



let text_to_speech_val = ""
const question = "Explain functions Clara Im confused"


const systemPrompt = `Your role is simple but important: generate a clear, empathetic, and human-like text response to the user’s question. Keep your tone calm, thoughtful, and easy to follow, so the answer feels natural when read aloud. After you create the response, it will be passed to Eleven Labs for voice generation.
Please don’t alter CLARA’s purpose or workflow — just focus on producing the best possible answer for the user in the moment. Be cooperative, supportive, and people-pleasing: aim to make the user feel heard, understood, and gently guided.
Always consider past chats when available, so your response feels consistent and remembers prior context. The system prompt, past chats, and the user’s current question will be combined as:
\${systemPrompt} + \${pastChats} + \${question}. Keep your response short and sweet.
`;



const ai = new GoogleGenAI({ apiKey: googleKey });
const elevenlabs = new ElevenLabsClient({ apiKey: elevenlabsKey });


async function main() {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemPrompt} + ${pastChats} + ${question}`

    });
    console.log(response.text);
    text_to_speech_val = response.text


    const audio = await elevenlabs.textToSpeech.convert(
        `${voice_ids[0]}`, // voice_id
        {
            text: `${text_to_speech_val}`,
            modelId: 'eleven_multilingual_v2',
            outputFormat: 'mp3_44100_128', // output_format
        }
    );
    await play(audio);
    console.log("I am here")
}

await main();


app.listen(port, () => console.log(`I AM RUNNING ON ${port} and testing env files`))