import React from 'react'

export default function Loading() {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex justify-center items-center'>
            <img src="/Loading.gif" alt="Loading" />
        </div>
    )
}