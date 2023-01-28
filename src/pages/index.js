import Layout from '@/components/Layout'
import Productiitem from '@/components/Productiitem'
import data from '@/utils/data'
import { Inter } from '@next/font/google'
import Product from '@/models/Product'
import db from '@/utils/db'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
  const { state, dispatch } = useContext()
  const { cart } = state

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    
    if(data.countInStock < quantity){
      return toast.error('Sorry, Product is out of stock') 
    }
    
    dispatch({type:'CART_ADD_ITEM', payload: {...product, quantity: quantity}})
    
    toast.success('Product added to the cart')
}

  return (
     <Layout title={'Home Page'}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4'>
          {products.map((product,i) => (
            <Productiitem 
              product={product} 
              key={product.slug+i} 
              addToCartHandler={addToCartHandler}
            />
          ))}
        </div>
     </Layout>
  )
}

export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find().lean()
  
  return {
    props:{
      products: products.map(db.convertDocToObj),
    }
  }
}