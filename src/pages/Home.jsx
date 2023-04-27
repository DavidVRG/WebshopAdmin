import React from 'react'
import Header from '../components/Home/Header'
import Statistics from '../components/Home/Statistics'
import Orders from '../components/Home/Orders'

export default function Home() {
  return (
    <main>
      <Header />
      <div className='w-[90%] mx-auto mt-8'>
        <h1 className='text-3xl font-medium mb-8'>Dashboard</h1>
        <Statistics />
        <Orders />
      </div>
    </main>
  )
}