import Layout from '@/components/Layout'
import Productiitem from '@/components/Productiitem'
import data from '@/utils/data'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <Layout title={'Home Page'}>
        <div className='grid grid-cols-1 gap-4 md:grid-cols3 lg:grid-cols-4'>
          {data.products.map((product,i) => (
            <Productiitem product={product} key={product.slug+i} />
          ))}
        </div>
     </Layout>
  )
}