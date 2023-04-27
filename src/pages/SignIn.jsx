import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Utils/Loading';

export default function SignIn() {

  // Import auth from firebase
  const auth = getAuth()

  // Import navigate from react router dom
  const navigate = useNavigate()

  // Set loading to true if admin wait for login and false if logged in
  const [loading, setLoading] = useState(false)

  // Auth datas
  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("test1234")

  // Sign in function
  function signInAdmin(event) {
    event.preventDefault()
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false)
        toast.success("Sign in success!")
        navigate("/")
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Sign in error!")
      });
  }

  return (
    loading ? (<Loading />) : (
      <main className='h-screen w-screen flex justify-center items-center'>
        <section className='bg-white max-w-[400px] max-h-[350px] w-[95%] md:w-full h-full shadow-md border-[1px] border-slate-100 rounded-sm'>
          <div className='h-full w-full flex flex-col items-center justify-center px-6'>

            <h1 className='flex items-center gap-4 cursor-default text-3xl mb-8 font-medium tracking-wide'>
              <img src="logo.png" alt="Logo" className='h-20 w-20' />
              Sign In
            </h1>

            <form className='space-y-4' onSubmit={signInAdmin}>
              <input
                className='w-full p-2 rounded-md bg-white border-[1px] border-slate-200 shadow-sm focus:outline-blue-500'
                placeholder='Email address'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email" />
              <input
                className='w-full p-2 rounded-md bg-white border-[1px] border-slate-200 shadow-sm focus:outline-blue-500'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password" />
              <button
                className='w-full p-2 bg-red-500 hover:bg-red-600 transition duration-200 ease-in-out rounded-md text-white shadow-sm'
                type="submit">
                Sign In
              </button>
            </form>

          </div>
        </section>
      </main>
    )
  )
}