import Layout from '@/components/Layout'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <Layout title={'Home Page'}>
      <h1 className="text-3xl font-bold ">Next Ecommerce</h1>
     </Layout>
  )
}
