import CheckoutWizard from '@/components/CheckoutWizard '
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function PaymentScreen() {

  const {push} = useRouter()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')

  const { state, dispatch } = useContext(Store)
  const { cart} = state
  const { shippingAddress, paymentMethod } = cart

  const submitHandler = (e) => {
    e.preventDefault()
    if(!selectedPaymentMethod){
      return toast.error('Payment method is required')
    }
    dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    )
  }

  useEffect(() => {
    if(!shippingAddress.address){
      return push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
  },[shippingAddress.address, paymentMethod, push])

  return (
    <Layout title='Payment Method'>
      <CheckoutWizard activeStep={2} />
      <form className='mx-auto max-w-screen-md font-semibold' onSubmit={submitHandler}>
        <h1 className='mb-4 text-xl'>Payment Method</h1>
        {
          ['Paypal','Stripe','CashOneDelivery'].map((payment) => (
            <div key={payment} className='mb-4'>
              <input
                name='paymentMethod'
                className='p-2 outline-none focus:ring-0'
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label className='p-2' htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className='mb-4 flex justify-between'>
            <button
              onClick={() => push('/shipping')}
              type='button'
              className='default-button'
            >
              Back
            </button>
            <button className='primary-button' onClick={() => push('/placeorder')}>Next</button>
          </div>
      </form>
    </Layout>
  )
}


PaymentScreen.auth = true