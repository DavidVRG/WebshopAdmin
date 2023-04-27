import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';

export default function Header() {

  // Import auth from firebase
  const auth = getAuth()

  // Sign out function
  function signOutAdmin() {
    signOut(auth).then(() => {
      toast.success("Sign out success!")
    }).catch((error) => {
      toast.error("Sign out error!")
    });
  }

  return (
    <header className='h-14 flex justify-between items-center w-full bg-white text-[#212529] shadow-sm border-[1px] px-4 md:px-8 border-slate-100'>
      <div className='flex items-center gap-2'>
        <img src="logo.png" alt="Logo" className='w-10 h-10' />
        <h1 className='hidden md:block font-semibold text-xl'>Webshop Webadmin</h1>
      </div>
      <div className='flex gap-4'>
        <div className='flex flex-col'>
          <span className='font-medium'>Admin</span>
          <span className='font-normal text-sm text-gray-500'>{auth.currentUser.email}</span>
        </div>
        <button className='bg-blue-500 text-sm py-2 px-4 text-white font-medium rounded-xl'
        onClick={signOutAdmin}>
          Sign Out
        </button>
      </div>
    </header>
  )
}