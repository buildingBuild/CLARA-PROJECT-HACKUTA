import { GoogleGenAI } from "@google/genai";
import { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';
import { SyncClient } from "@sync.so/sdk";
import { promises as fs } from 'fs';
import axios from 'axios'
import express from 'express'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import cors from 'cors';
import nodemailer from 'nodemailer'



const app = express()
const port = process.env.PORT
const googleKey = process.env.GOOGLE_AI_KEY
const elevenlabsKey = process.env.ELEVEN_LABS_KEY

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); /// es module directory stufff

const ai = new GoogleGenAI({ apiKey: googleKey });
const elevenlabs = new ElevenLabsClient({ apiKey: elevenlabsKey });


app.use(cors());
app.use(express.static('public'))



app.get('/test', (req, res) => {


})

app.get('/generate', async (req, res) => {

    try {
        const { email, mood, wish, parent, voice } = req.query

        console.log(typeof parent)
        console.log(typeof voice)
        if (parent == "false" && voice == "null") {

            res.status(200).json({
                message: "user version "
            })


        } else {
            res.status(200).json({
                message: "Parent version"
            })


            console.log("BAD")

        }







        res.status(200).json({
            email: email,
            mood: mood,
            wish: wish
        })


        const transporter = nodemailer.createTransport(
            {

                secure: true,
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'eneojo.solomon.u@gmail.com',
                    pass: 'zlwc ufrt mtlm dsid'
                }

            }
        );

        await transporter.verify();

        let info = await transporter.sendMail({
            to: `${email}`,
            subject: "Your generated stories",
            text: "You have to believe in the impossible can u ?",

        })

        console.log("Sent", info.messageId)

    }
    catch (err) {
        // console.log(err.message)
    }
    finally {
    }




















})

// Male voice at index 0
const voice_ids = ["I3M3nb9pIAmagyf8aCSq", "dmDD8T933s9glsN800C3"]

let text_to_speech_val = ""
let usermood = "I am feeling happy but not to crazy"
let bedtimeWish = "I want to fly I wish I could fly"
let parent_voice_mode = "false";

let i = 0;

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

you will take in usermoods into consideration and their bedtime wish. make it 100 words Max.
`;



app.use('/static', express.static('public'))

async function main() {

    /*
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: ` ////system instruction: ${systemPrompt} + user mood : ${usermood} user bedtime wish : ${bedtimeWish} + parent_voide_mode${parent_voice_mode}`
    
        });
        console.log(response.text);
        text_to_speech_val = response.text
    
    
        const audio = await elevenlabs.textToSpeech.convert(
            `${voice_ids[1]}`, // voice_id
            {
                text: `${text_to_speech_val}`,
                modelId: 'eleven_multilingual_v2',
                outputFormat: 'mp3_44100_128', // output_format
            }
        );
    
        const chunks = [];
        for await (const chunk of audio) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);
        const id = uuidv4();
        const audioDir = path.join(__dirname, "public/audio");
        await fs.mkdir(audioDir, { recursive: true });
        const audioPath = path.join(audioDir, `story.mp3`);
    
    
        await fs.writeFile(audioPath, audioBuffer);
        console.log(`Saved at: ${audioPath}`);
    
    
    */




}


await main();

app.listen(port, () => console.log(`I AM RUNNING ON ${port} and testing env files`))