'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import  Field  from '@/components/ui/Field'
import { Form } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'

const AuthForm = ({ type }: AuthFormProps) => {

  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const authSchema = authFormSchema(type)


    // 1. Define your form.
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
        
    // 2. Define a submit handler.
    async function onSubmit(data: z.infer<typeof authSchema>) {
        setIsLoading(true)

        try {
            //!  Sign Up with AppWrite & create plain link token


            if(type === 'sign-up'){
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    email: data.email!,
                    password: data.password!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dob!,
                    ssn: data.ssn!
                };

                const newUser = await signUp(userData)
                setUser(newUser)
            }

            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                console.log('res', response)
                if(response) router.push('/')
            }               
        } catch (error) {
            console.log('error',error)
        } finally {
            setIsLoading(false)   
        }

    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link 
                href='/' 
                className='flex cursor-pointer lfex items-center gap-1'
            >
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='PrJBank Logo'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>PrJBank</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                   { user
                    ? 'Link Account'
                    : type === 'sign-in'
                    ? 'Sign In'
                    : 'Sign Up'}

                    <p className="text-16 font-normal text-gray-600">
                        { user 
                        ? 'Link your account to get started'
                        : 'Please enter your details' }
                    
                    </p>
                </h1>
            </div>
        </header>
        { user ? (
            <div className="flex flex-col gap-4">
                <PlaidLink  user={user} variant="primary"/>
            </div>
        ) : ( 
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Field            
                            form={form}
                            name="email"
                            label="Email"
                            placeholder="Enter your email"               
                        />

                        {type === 'sign-up' && (
                            <>    

                                <div className='flex gap-4'>
                                    <Field                       
                                        form={form}
                                        name="firstName"
                                        label="First Name"
                                        placeholder="Enter your first name"       
                                    />
                                    <Field                       
                                        form={form}
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Enter your last name"       
                                    />                                    
                                </div>
                                <div className='flex gap-4'>
                                    <Field                       
                                        form={form}
                                        name="address1"
                                        label="Address1"
                                        placeholder="Enter your address"       
                                    />
                                <Field                       
                                    form={form}
                                    name="city"
                                    label="City"
                                    placeholder="Enter your city"       
                                />                                    
                                </div>


                                <div className='flex gap-4'>
                                    <Field                       
                                        form={form}
                                        name="state"
                                        label="State"
                                        placeholder="Example: NY"       
                                    />
                                    <Field                       
                                        form={form}
                                        name="postalCode"
                                        label="Postal Code"
                                        placeholder="Example: 11101"       
                                    />                                    
                                </div>
                                <div className='flex gap-4'>
                                    <Field                       
                                        form={form}
                                        name="dob"
                                        label="Date of Birth"
                                        placeholder="YYYY-MM-DD"       
                                    />
                                    <Field                       
                                        form={form}
                                        name="ssn"
                                        label="SSN"
                                        placeholder="Example: 4353"       
                                    />                                    
                                </div>

                            </>
                        )}

                        <Field            
                            form={form}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"               
                        />
                        <div className='flex flex-col gap-4'>
                            <Button 
                                type="submit"
                                className='form-btn'
                                disabled={isLoading}
                                
                            >
                                {
                                    isLoading 
                                    ? (
                                        <>
                                        <Loader2 size={28}
                                        className='animate-spin' /> &nbsp;
                                        Loading... </> )
                                    : type === 'sign-in' 
                                    ? 'Sign In' : 'Sign Up'            
                                }
                            </Button>                        
                        </div>
                    </form>
                </Form>            
                
                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>{type === 'sign-in'
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    </p>
                    <Link
                        href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                        className='form-link'
                    >{type === 'sign-in' ? 'Sign Up' : 'Sign In'}</Link>
                </footer>
            </>
        )} 
    </section>
  )
}

export default AuthForm