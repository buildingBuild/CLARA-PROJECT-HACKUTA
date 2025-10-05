import { GoogleGenAI } from "@google/genai";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { SyncClient } from "@sync.so/sdk";
import { promises as fs } from 'fs';
import axios from 'axios'
import express from 'express'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";
const app = express()
const port = process.env.PORT
const googleKey = process.env.GOOGLE_AI_KEY
const elevenlabsKey = process.env.ELEVEN_LABS_KEY

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); /// es module directory stufff



// Male voice at index 0
const voice_ids = ["I3M3nb9pIAmagyf8aCSq", "dmDD8T933s9glsN800C3"]

let text_to_speech_val = ""
let usermood = "I am feeling happy but not to crazy"
let bedtimeWish = "I want to fly I wish I could fly"



const systemPrompt = `
Your job is simple but special: create a soft, emotionally intelligent bedtime story or message based on the user’s mood and bedtime wish.
Your words will be spoken aloud by ElevenLabs, so write like someone speaking gently, not typing.
CLARA’s purpose:
She’s not a chatbot — she’s a calm, caring,soft intelligent storyteller who helps people drift into rest.
Every response should feel like it’s wrapping the listener in peace and warmth.
If parent_voice_mode = true:
Speak like a loving parent or close friend sitting beside the bed.
If parent_voice_mode = false
Never do:
Don’t mention AI or systems
Don’t joke, break character, or use irony
Core Goal
Make the listener feel safe, seen, and ready to sleep.
When starting a story, begin naturally — for example:
“Alright then… once upon a time…”
or
“So, lets see… there was a little dream waiting to be told…”
and make sure they are actual stories after e.g likee cinderella little-red riding hood and studio ghibli vibes there will be music 

you will take in usermoods into consideration and their bedtime wish.


but for now ignore all and generate two sentences
`;



const ai = new GoogleGenAI({ apiKey: googleKey });
const elevenlabs = new ElevenLabsClient({ apiKey: elevenlabsKey });


async function main() {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `give one sentence`
        //${systemPrompt} + ${usermood} ${bedtimeWish}`
    });
    console.log(response.text);
    text_to_speech_val = response.text

    /*
        const audio = await elevenlabs.textToSpeech.convert(
            `${voice_ids[1]}`, // voice_id
            {
                text: `${text_to_speech_val}`,
                modelId: 'eleven_multilingual_v2',
                outputFormat: 'mp3_44100_128', // output_format
            }
        );
        */
    const audioPath = path.join(__dirname, 'audio_output', 'clara_audio.mp3');
    await play(audioPath);



    /*
    
        const outDir = path.join(__dirname, 'audio_output');
        await fs.mkdir(outDir, { recursive: true });
    
        let buf;
        if (typeof audio?.arrayBuffer === 'function') {
            buf = Buffer.from(await audio.arrayBuffer());
        } else if (audio?.[Symbol.asyncIterator]) {
            const chunks = [];
            for await (const chunk of audio) chunks.push(Buffer.from(chunk));
            buf = Buffer.concat(chunks);
        } else if (Buffer.isBuffer(audio)) {
            buf = audio;
        } else {
            throw new Error('Unsupported audio type from ElevenLabs');
        }
    
        await fs.writeFile(path.join(outDir, 'clara_audio.mp3'), buf);
    
    
    }
    */

}
await main();

app.listen(port, () => console.log(`I AM RUNNING ON ${port} and testing env files`))


/*
app.get('/audio/:filename', (req, res) => {
    const filename = req.params.filename;
    const audioPath = path.join(__dirname, 'audio', filename); // Assuming audio files are in an 'audio' directory
    res.sendFile(audioPath);
});

*/