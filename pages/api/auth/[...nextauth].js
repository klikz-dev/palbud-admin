import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function createUserObj(user) {
  return {
    id: user?.uid,
    accessToken: user?.accessToken,
    email: user?.email,
  }
}

export default NextAuth({
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },

  providers: [
    CredentialsProvider({
      id: 'un-pw-login',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { email, password } = credentials

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        if (userCredential?.user?.uid) {
          const user = createUserObj(userCredential.user)
          return user
        } else {
          return null
        }
      },
    }),
  ],

  session: {
    jwt: true,
  },

  secret: process.env.JWT_SECRET_KEY,

  jwt: {
    secret: process.env.JWT_SECRET_KEY,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user
      }
      return token
    },
    async session({ session, token }) {
      session = token
      return session
    },
  },
})
