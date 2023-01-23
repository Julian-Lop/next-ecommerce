import { Store } from '@/utils/Store'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

export default function Layout({title, children}) {

	const {state, dispatch} = useContext(Store)
	const {cart} = state
	const [cartItemsCount, setCartItemsCount] = useState(0)

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a,c) => a + c.quantity, 0))
	}, [cart]);

  return (
	<>      
			<Head>
				<title>{title ? title+' - Ecommerce' : 'Ecommerce'}</title>
				<meta name="description" content="Ecommerce website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head> 

			<div className='flex min-h-screen flex-col justify-between'>
				<header>
					<nav className='flex h-12 items-center px-4 justify-between shadow-md'>
						<Link legacyBehavior href='/'>
							<a className='text-lg font-bold'>Home</a>
						</Link>
						<div className='font-semibold'>
							<Link legacyBehavior href='/cart'>
								<a className='p-2'>Cart
								{cartItemsCount > 0 && (
									<span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
										{cartItemsCount}
									</span>
								)}
								</a>
							</Link>
							<Link legacyBehavior href='/login'>
								<a className='p-2'>Login</a>
							</Link>
						</div>
					</nav>
				</header>
				<main className='container m-auto mt-4 px-4'>
					{children}
				</main>
				<footer className='flex h-10 justify-center items-center shadow-inner'>  
					<p>Copyright © 2023 Ecommerce</p>             
				</footer>
			</div>
	</>
  )
}
