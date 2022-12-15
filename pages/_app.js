import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import '@/styles/globals.scss'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextAuthProvider session={session}>
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}
