import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Logo from '../Logo'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

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

      <div className='mt-4 mb-4 flex flex-col items-start gap-4 rounded w-72'>
        <Input
          type={'email'}
          placeholder='Your Email'
          value={email}
          setValue={setEmail}
        />

        <Input
          type={'password'}
          placeholder='Your Password'
          value={password}
          setValue={setPassword}
        />

        <Button
          color='indigo'
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Log In
        </Button>

        {error && <p className='text-red'>{error}</p>}
      </div>
    </div>
  )
}
