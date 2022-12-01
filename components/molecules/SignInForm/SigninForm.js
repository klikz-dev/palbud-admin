import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Input from '@/components/atoms/Input'
import Logo from '../Logo'

export default function SigninForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e && e.preventDefault()

    signIn('un-pw-login', { email, password })
  }

  useEffect(() => {
    if (router.query.error === 'CredentialsSignin') {
      setError('Invalid username or password.')
    }
  }, [router.query.error])

  return (
    <div className='px-12 py-8 bg-white rounded shadow-lg text-center'>
      <div className='flex flex-row justify-center'>
        <Logo />
      </div>

      <h4 className='text-gray-400 mt-3 mb-5'>palbud Admin</h4>

      <h3 className='text-black text-2xl font-bold mt-6 mb-2'>
        Log In to palbud Admin
      </h3>

      <p className='text-gray-400 mt-3 mb-5 text-sm'>
        Enter your email and password below
      </p>

      <form
        className='mt-4 mb-4 flex flex-col items-start gap-4 rounded w-72'
        onSubmit={handleLogin}
      >
        <Input
          id='email'
          name='email'
          type='email'
          placeholder='Your Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          id='password'
          name='password'
          type='password'
          placeholder='Your Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input type='submit' value='Sign in' />

        {error && <p className='text-red'>{error}</p>}
      </form>
    </div>
  )
}
