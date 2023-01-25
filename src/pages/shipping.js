import CheckoutWizard from '@/components/CheckoutWizard '
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function ShippingScreen() {

  const {push} = useRouter()

  const {
    handleSubmit,
    register,
    formState: {errors},
    setValue,
  } = useForm()

  const { state, dispatch } = useContext(Store);
  const { cart, cart : {shippingAddress} } = state

  useEffect(() => {
    Object.keys(shippingAddress).map((key) => {
      setValue(`${key}`, shippingAddress[key])
    })
  }, [setValue, shippingAddress])
  

  const submitHanlder = ({fullName, address, city, postalCode, country}) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {fullName, address, city, postalCode, country}
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress:{
          fullName,
          address,
          city,
          postalCode,
          country
        }
      })
    )
    push('/payment')
  }
  
  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1}/>
      <form 
        className='mx-auto max-w-screen-md font-semibold'
        onSubmit={handleSubmit(submitHanlder)}
      >
        <h1 className='mb-4 text-xl'>Shipping Address</h1>
        <div className='mb-4'>
          <label htmlFor='fullname'>Full Name</label>
          <input 
            className='w-full' 
            id='fullName' 
            autoFocus 
            {...register('fullName',
              {required: 'Plese enter full name',
            })}
          />
          {errors.fullName && (
            <div className='text-red-500'>
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='address'>Address</label>
          <input 
            className='w-full' 
            id='address' 
            autoFocus 
            {...register('address',
              {required: 'Plese enter address',
              minLength: {value: 3, message: 'Address is more than 2 chars'}
            })}
          />
          {errors.address && (
            <div className='text-red-500'>
              {errors.address.message}
            </div>
          )}
        </div>
        
        <div className='mb-4'>
          <label htmlFor='city'>City</label>
          <input 
            className='w-full' 
            id='city' 
            autoFocus 
            {...register('city',
              {required: 'Plese enter city',
            })}
          />
          {errors.city && (
            <div className='text-red-500'>
              {errors.city.message}
            </div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='postalCode'>Postal Code</label>
          <input 
            className='w-full' 
            id='postalCode' 
            autoFocus 
            {...register('postalCode',
              {required: 'Plese enter Postal Code',
            })}
          />
          {errors.postalCode && (
            <div className='text-red-500'>
              {errors.country.message}
            </div>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor='country'>Country</label>
          <input 
            className='w-full' 
            id='country' 
            autoFocus 
            {...register('country',
              {required: 'Plese enter country',
            })}
          />
          {errors.country && (
            <div className='text-red-500'>
              {errors.country.message}
            </div>
          )}
        </div>

        <div className='mb-4 flex justify-between'>
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </Layout>
  )
}

ShippingScreen.auth = true