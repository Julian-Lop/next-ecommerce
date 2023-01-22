import { Store } from '@/utils/Store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

export default function Productiitem({product}) {

    const {push} = useRouter()

    const {state, dispatch} = useContext(Store)

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1
        
        if(product.countInStock < quantity){
            alert('Sorry, Product is out of stock')
            return 
        }
        
        dispatch({type:'CART_ADD_ITEM', payload: {...product, quantity: quantity}})
        push('/cart')
    }

    return (
        <div className='card'>
            <Link legacyBehavior href={`/product/${product.slug}`}>
                <a>
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className='rounded sahdow'
                    />
                </a>
            </Link>

            <div className='flex flex-col items-center justify-center p-5 font-semibold'>
                <Link legacyBehavior href={`/product/${product.slug}`}>
                    <a>
                        <h2 className='text-lg'>
                            {product.name}
                        </h2>
                    </a>
                </Link>
                <p className='mn-2'>{product.brand}</p>
                <p>${product.price}</p>
                <button className='primary-button' type="button" onClick={addToCartHandler}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}
