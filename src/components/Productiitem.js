import { Store } from '@/utils/Store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

export default function ProductiItem({product, addToCartHandler}) {

    const {push} = useRouter()

    const {state, dispatch} = useContext(Store)

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
                <button className='primary-button' type="button" onClick={() => addToCartHandler(product)}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}
