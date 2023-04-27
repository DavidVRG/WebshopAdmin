import React, { useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../../context/OrdersContext'

export default function Statistics() {

    // Import orders from OrdersContext
    const { orders } = useContext(OrdersContext)

    // Total orders
    const [totalOrders, setTotalOrders] = useState(0)

    useEffect(() => {
        if (orders.length !== 0) {
            let total = 0
            orders.forEach((item) => {
                total = total + item.data.sumPrice
            })
            setTotalOrders(total)
        }
    }, [orders])

    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>

            <div className='bg-white h-32 shadow-sm border-[1px] border-slate-100 rounded-sm p-4'>
                <span className='text-gray-500 text-sm'>Total sells</span>
                <div className='text-3xl font-medium mt-4'>
                    ${totalOrders}
                </div>
                <span className='block text-end text-gray-500 text-sm'>Last update: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>

            <div className='bg-white h-32 shadow-sm border-[1px] border-slate-100 rounded-sm p-4'>
                <span className='text-gray-500 text-sm'>Average order value</span>
                <div className='text-3xl font-medium mt-4'>
                    ${totalOrders && totalOrders / orders.length}
                </div>
                <span className='block text-end text-gray-500 text-sm'>Last update: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>

            <div className='bg-white h-32 shadow-sm border-[1px] border-slate-100 rounded-sm p-4'>
                <span className='text-gray-500 text-sm'>Total orders</span>
                <div className='text-3xl font-medium mt-4'>
                    {orders.length}
                </div>
                <span className='block text-end text-gray-500 text-sm'>Last update: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>

        </section>
    )
}