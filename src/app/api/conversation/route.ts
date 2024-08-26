import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import  {OpenAI} from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const body = await req.json()
        const {messages} = body
console.log(" ====", messages);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: messages}],
        stream: true,
         });
         console.log("strem = ", stream);
         console.log("messages = ", messages);
         
         
         let data = "";
        for await (const chunk of stream) {
           data += process.stdout.write(chunk.choices[0]?.delta?.content || "");
            }
            console.log("data = ", data);
        return new NextResponse(data, { status: 200 });
    } catch (error) {
        console.log("configration error ", error);
        return new NextResponse("Error", { status: 500 });
    }
}