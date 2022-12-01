import { SessionProvider as NextAuthProvider } from 'next-auth/react'
import { ThemeProvider } from '@material-tailwind/react'
import '@/styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextAuthProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextAuthProvider>
  )
}
