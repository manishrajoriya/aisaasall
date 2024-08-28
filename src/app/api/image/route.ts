import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


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
        
    
        const input = {
                prompt: messages,
                num_outputs: 1,
                aspect_ratio: "1:1",
                output_format: "webp",
                output_quality: 80
        };
       const output = await replicate.run("black-forest-labs/flux-schnell", { input });

console.log(output);
        
        // console.log("result", result);
        // console.log("text", text);
        
        return NextResponse.json({data: output})
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}