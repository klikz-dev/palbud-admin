import Layout from '@/components/common/Layout'
import { useSession } from 'next-auth/react'

export default function Settings() {
  const { data: session } = useSession()
  console.log(session)
  return <Layout title='Settings'></Layout>
}
