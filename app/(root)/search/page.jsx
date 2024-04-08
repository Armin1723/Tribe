'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { searchBlogs } from '@/lib/actions/blog.actions'
import { formSchema } from "@/lib/validations/searchValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

    const [results, setResults ] = useState([])
    const [query, setQuery ] = useState('')

    //Form Validation
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: "",
        }
    })

    //Handle form submission
    const handleSearch = async (values) => {
        const id = toast.loading("Searching",{theme:'dark'});
        setResults((await searchBlogs(values.query, '/search/')));
        setQuery(values.query);
        setTimeout(() => {
            if( results )
                toast.update(id, { render: "Fetched results.", type: "success", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
            else
                toast.update(id, { render: "No result found.", type: "error", isLoading: false, theme:'dark', autoClose: 2000 , closeOnClick: true});
        }, 1000);
    }

    return(
        <div className="custom-scrollbar flex justify-start">
            <ToastContainer/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSearch)} className="fixed top-[9vh] max-sm:max-h-fit max-sm:top-[13vh] overflow-hidden max-sm:bottom-[10vh] left-[25vh] max-sm:left-0 flex justify-center max-sm:min-w-full md:gap-2 hover:opacity-75 max-sm:text-xs">
                
                
                    
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl className='flex text-semibold text-gray-800'>
                            <Input placeholder="Enter Search Query" className="custom-scrollbar bg-gray-900/50 border border-blue-900 rounded-s-lg text-sm max-sm:max-w-[90%] w-[57vw] md:px-6 py-2 text-white" {...field} />
                        </FormControl>
                    </FormItem>
                    )}
                />

                <Button type="submit" className=' hover:bg-gradient-to-br from-blue-800/40 active:border-2 border-blue-600'>Search</Button>
                </form>
            </Form>

            {(results?.length>0) ? 
                results.map((result)=>{
                    return(
                        <div className="BlogCard mt-12 max-sm:mt-16 my-4 flex flex-col rounded-md bg-[#1f1f1f] p-2 font-serif w-[65vw] max-sm:w-[90vw]" key={result._id}>
                            <Link href={`/blogs/${result._id}`}>
                                <p className="text-2xl max-sm:text-sm capitalize text-bold">{result.title}</p>
                                <p className="text-sm max-sm:text-xs">{result.description}</p>
                            </Link>
                        </div>
                    )
                }):
                (!query ? <p className="mt-12 max-sm:mt-16 max-sm:text-xs">Enter Something to search</p> : <p className="mt-12 max-sm:mt-16 max-sm:text-xs">No result found</p>)
            }
        </div>
    )
}

export default page;