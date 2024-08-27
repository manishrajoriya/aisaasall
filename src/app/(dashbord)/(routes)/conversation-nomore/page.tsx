// "use client"
// import Heading from '@/components/Heading'
// import { MessageSquare } from 'lucide-react'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import * as z from 'zod'
// import { formSchema } from './constants'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import axios from 'axios';
// import { useRouter } from 'next/navigation'
// import {toast, Toaster} from 'react-hot-toast'

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page

// function Conversation() {
//     const router = useRouter();
//     const [messages, setMessages] = useState([ ])
//     const [input, setInput] = useState('')


//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             prompt: ''
//         }
//     })

//     const isLoading = form.formState.isSubmitting;

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//        try {
//         const userMessage = {
//             // role: 'user',
//             content: values.prompt
            
//         }
//         const newMessages = [...messages,userMessage, userMessage]

//         const response = await axios.post('/api/chat', {
//             messages: input
//         })
//         console.log("response = ", response.data);
//         console.log(userMessage);
        
//         setMessages(response.data)
//         form.reset();
//        } catch (error: any) {
//         //todo open pro model
//         console.log("message",error);
//         toast.error("Something went wrong")
        
//        }finally{
//         router.refresh()
//        }
//     }
//   return (
//     <div>
//         <Heading
//            title='Conversation'
//            description='Our most advanced conversation'
//            icon={MessageSquare}
//            iconColor='text-violet-500'
//            bgColor='bg-violet-500/10'
//         />
//         <div className='px-4 lg:px-8'>
//             <div>
//                 <Form {...form}>
//                     <form 
//                        onSubmit={form.handleSubmit(onSubmit)} 
//                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
//                        >
//                         <FormField
//                         name='prompt'
//                         render={({field}) => (
//                             <FormItem
//                               className='col-span-12 lg:col-span-10'
//                             >
//                               <FormControl className=' m-0 p-0'>
//                                 <Input
//                                   disabled={isLoading}
//                                   placeholder='How do i claculate the radious of circle'
//                                   {...field}
//                                   value={input}
//                                   onChange={(e) => setInput(e.target.value)}
//                                   className=' border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
//                                 />
//                               </FormControl>
//                             </FormItem>
//                         )}
//                         />
//                         <Button
//                           disabled={isLoading}
//                         className=' col-span-12 lg:col-span-2 w-full'>
//                             Genrate
//                         </Button>
//                     </form>
//                 </Form>
//             </div>
//             <div className=' space-y-4 mt-4'>
//                <div className=' flex flex-col-reverse gap-y-4'>
//                  {
                  
//                     [messages]
                  
//                  }
//                </div>
//             </div>
//         </div>
//         <Toaster/>
//     </div>
//   )
// }

// export default Conversation