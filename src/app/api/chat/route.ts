import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { incriseApiLimit, checkApiLimit } from '@/lib/api-limit';
const { GoogleGenerativeAI } = require("@google/generative-ai");
// import GoogleGenerativeAI from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
    try {
        const {userId} =  auth()
        const body = await req.json()
        const {messages} = body
    // console.log("message = ", messages);
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }
        
        const freeTrail = await checkApiLimit()

        if (!freeTrail) {
            return new NextResponse("You have reached your limit", { status: 403 });
        }
    
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(messages)
        const response = await result.response;
        const text = response.text();
        
        await incriseApiLimit()
        
        // console.log("result", result);
        // console.log("text", text);
        
        return NextResponse.json({data: text})
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}