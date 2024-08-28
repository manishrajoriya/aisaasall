"use client"
import Heading from '@/components/Heading'
import { ImageIcon, LoaderCircleIcon, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import {toast, Toaster} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { string } from 'zod';
import Image from 'next/image';


function Chat() {
    const [image, setImage] = useState<Record<string, string | number>>({})
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [question, setQuestion] = useState('')

    const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)

            const response =await axios.post('/api/image', {
                messages: input
            })
            console.log("response = ", response);
            setImage(response.data)
            
            setQuestion(input)
            setLoading(false)
            toast.success("Message sent successfully")
        } catch (error) {
            
            console.log(error);
            toast.error("Something went wrong")
        }finally{
            router.refresh()
            setInput('')
            setLoading(false)
        }

    }
  return (
    <div className='px-4 lg:px-8'>
        <Heading
            title='Image Genrate'
            description='Generate image from text'
            icon={ImageIcon}
            iconColor='text-violet-500'
            bgColor='bg-violet-500/10'
         />
         <div className=''>
            <form
              className=''
              onSubmit={onSubmit}
            >
                <Input
                    title='enter prompt '
                    placeholder='Enter text to genrate image'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    className=' border-0 space-y-4 outline-1 focus-visible:ring-0 focus-visible:ring-transparent'
                />
                <Button
                className='col-span-12 lg:col-span-2 w-full'
                 type='submit'
                 disabled={loading}
                >
                    {loading ? 'Generating' : 'Generate'}
                </Button>
            </form>
         </div>
         <div>
            {
                loading && <progress/> 
            }
         </div>
         <div className=' space-y-4 mt-4'>
              {Object.keys(image).length > 0 ? (
                    <div className='flex flex-col-reverse gap-y-4'>
                        
                        <ul>
                            {Object.entries(image).map(([key, value]) => (
                                <li key={key}>
                                     <Image src={value as string} alt={key} width={200} height={200} className='rounded-lg'/> 
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No messages</p>
                )}
         </div>
         <Toaster/>
    </div>
  )
}

export default Chat