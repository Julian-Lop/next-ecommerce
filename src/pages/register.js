import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {signIn, useSession} from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { getError } from '@/utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function RegisterScreen() {

  const {push, query:{redirect}} = useRouter()

  const {data: session} = useSession()

  useEffect(() => {
    if(session?.user){
      push(redirect|| '/')
    }
  }, [session,redirect])
  

  const {
    handleSubmit,
    register,
    getValues,
    formState: {errors},
  } = useForm()

  const submitHandler = async ({name,email,password}) => {
    try {
      await axios.post(`/api/auth/signup`, {
        name,
        email,
        password
      })

      const result = await signIn('credentials',{
        redirect: false,
        email,
        password
      })
      if(result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }

  }

  return (
    <Layout title="Create Account">
      <form className='mx-auto max-w-screen-md font-semibold' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor='password'>Name</label>
          <input 
            type="text"
            {...register('name', {required: 'Please enter name',})} 
            className='w-full' 
            id='name' 
            autoFocus
          />
          {errors.name && (
            <div className="text-red-500 ">{errors.name.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input 
            type="email"
            {...register('email',{required: 'Please enter email',
            pattern: {value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i, message: 'Please enter valid email'}})} 
            className='w-full' 
            id='email' 
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input 
            type="password"
            {...register('password', {required: 'Please enter password',
            minLength: { value: 6, message: 'password is more than 5 chars' },})} 
            className='w-full' 
            id='password' 
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input 
            type="password"
            {...register('confirmPassword', {required: 'Please enter confirm password',
            validate: (value) => value === getValues('password'),
            minLength: { value: 6, message: 'Password is more than 5 chars' },})} 
            className='w-full' 
            id='confirmPassword' 
            autoFocus
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">{errors.confirmPassword.message}</div>
          )}

          {errors.confirmPassword && 
          errors.confirmPassword.type === 'validate' && (
            <div className='text-red-500'>Password do not match</div>
          )}
        </div>

        <div className='mb-4'>
          <button className='primary-button'>Register</button>
        </div>
        <div className='mb-4'>
          Don&apos;t have an account? &nbsp;
          <Link legacyBehavior href={`/register?redirect=${redirect || '/'}`}>
            <a>Register</a>
          </Link>
        </div>
        </form>
    </Layout>
  )
}
