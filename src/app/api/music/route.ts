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
        
    
        
       const output = await replicate.run(
                "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
                {
                    input: {
                top_k: 250,
                top_p: 0,
                prompt: messages,
                duration: 8,
                temperature: 1,
                continuation: false,
                model_version: "stereo-large",
                output_format: "mp3",
                continuation_start: 0,
                multi_band_diffusion: false,
                normalization_strategy: "peak",
                classifier_free_guidance: 3
                }
            }
            );
console.log(output);
        
        // console.log("result", result);
        // console.log("text", text);
        
        return NextResponse.json({data: output})
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
        
    }
}