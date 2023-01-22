import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import {XCircleIcon} from '@heroicons/react/outline'
import { useRouter } from 'next/router'

export default function CartScreen() {

		const {push} = useRouter()

		const {state, dispatch} = useContext(Store)
		const {cart : {cartItems}} = state

		const removeItemHandler = (item) => {
			dispatch({type: 'CAR_REMOVE_ITEM',payload: item})
		}

		const updateCartHandler = (item,value) => {
			const quantity = Number(value)
			dispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}})
		}

		return (
			<Layout title="Shopping Cart">
				<h1 className='mb-4 text-xl'>Shopping Cart</h1>
				{
					cartItems.length === 0 ? 
					(<div>
							CArt is empty. <Link href="/">Go shopping</Link>
					</div>) :
					(<div>
						<div className='grid md:grid-cols-4 md:gap-5'>
								<div className='overflow-x-auto md:col-span-3'>
										<table className='min-w-full'>
												<thead className='border-b'>
														<tr>
																<th className='px-5 text-left'>Item</th>
																<th className='p-5 text-right'>Quantity</th>
																<th className='p-5 text-right'>Price</th>
																<th className='p-5'>Action</th>
														</tr>
												</thead>
												<tbody>
														{cartItems.map((item) => (
																<tr key={item.slug} className='border-b'>
																		<td>
																				<Link legacyBehavior href={`/product/${item.slug}`}>
																						<a className='flex items-center'>
																								<Image 
																										src={item.image}
																										alt={item.name}
																										width={50}
																										height={50}
																								/>
																								&nbsp;
																								{item.name}
																						</a>
																				</Link>
																		</td>
																		<td className='p-5 text-right'>
																				<select value={item.quantity} onChange={(e) => updateCartHandler(item,e.target.value)}>
																				{
																						[...Array(item.countInStock).keys()].map((x) => (
																								<option value={x+1} key={x+1}>{x+1}</option>
																						))
																				}
																				</select>
																		</td>
																		<td className='p-5 text-right'>{item.quantity}</td>
																		<td className='p-5 text-right'>${item.price}</td>
																		<td className='p-5 text-center'>
																				<button  type='button' onClick={() => removeItemHandler(item)}>
																						<XCircleIcon className='h-5 w-5'></XCircleIcon>
																				</button>
																		</td>
																</tr>
														))}
												</tbody>
										</table>
								</div>
								<div className='card p-5 font-semibold'>
										<ul>
												<li>
														<div className='pb-3 text-xl'>
																Subtotal ( {cartItems.reduce((a,c) => a + c.quantity, 0)} ) : $
																{cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}
																</div>
												</li>
												<li>
														<button 
																type="button" 
																className='primary-button x-full'
																onClick={() => push('/shipping')}
														>Check Out</button>
												</li>
										</ul>
								</div>
						</div>
					</div>)
				}
			</Layout>
		)
}
