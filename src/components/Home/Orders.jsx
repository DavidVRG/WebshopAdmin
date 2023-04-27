import React, { useContext, useEffect, useRef, useState } from 'react'
import { OrdersContext } from '../../context/OrdersContext'
import { db } from '../../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export default function Orders() {

  // Ref for outsideclick
  const hiddenChangeStatus = useRef()

  // Import orders from OrdersContext
  const { orders } = useContext(OrdersContext)

  // Change order status
  const [orderData, setOrderData] = useState({
    status: "",
    id: ""
  })
  const { status, id } = orderData

  // Show change status component or not
  const [showChangeStatus, setShowChangeStatus] = useState(false)

  // If the user click outside then the currrent component set to hidden
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the previous comments is open and the clicked target is not within the previous comments,
      // then close the previous comments
      if (showChangeStatus !== false && hiddenChangeStatus.current && !hiddenChangeStatus.current.contains(e.target)) {
        setShowChangeStatus(false)
        setOrderData({
          id: "",
          status: ""
        })
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [showChangeStatus])

  // Change order status in firebase
  async function changeOrderStatus() {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: status
    })
      .then(() => {
        toast.success("Update success!")
        setShowChangeStatus(false)
        setOrderData({
          id: "",
          status: ""
        })
      })
      .catch((error) => {
        toast.error("Update error!")
      })

  }

  return (
    <main className='mb-8'>

      <section className={`${showChangeStatus ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-200 fixed top-0 flex justify-center items-center right-0 left-0 bottom-0 w-screen h-screen bg-gray-600 z-50 bg-opacity-50`}>
        <div ref={hiddenChangeStatus} className='max-h-72 max-w-md bg-white w-[95%] md:w-full h-full rounded-md shadow-md p-4'>

          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <img src="logo.png" alt="Logo" className='w-10 h-10' />
              <h1 className='font-medium text-xl'>Change order status</h1>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setShowChangeStatus(false),
                  setOrderData({
                    id: "",
                    status: ""
                  })
              }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <div className='flex justify-center gap-3 mt-8'>
            <button
              onClick={() => setOrderData((prevState) => ({ ...prevState, status: "pending" }))}
              className="text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium flex gap-1 p-2 transition duration-200 ease-in-out">
              Pending
            </button>
            <button
              onClick={() => setOrderData((prevState) => ({ ...prevState, status: "shipping" }))}
              className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-medium flex gap-1 p-2 transition duration-200 ease-in-out">
              Shipping
            </button>
            <button
              onClick={() => setOrderData((prevState) => ({ ...prevState, status: "delivered" }))}
              className="text-white bg-green-500 hover:bg-green-600 rounded-lg font-medium flex gap-1 p-2 transition duration-200 ease-in-out">
              Delivered
            </button>
          </div>

          <div className='flex justify-center gap-2 mt-8'>
            <span className='font-medium'>Status:</span> {status}
          </div>

          <button
            onClick={changeOrderStatus}
            className='bg-blue-500 w-full mt-5 p-2 rounded-md shadow-sm text-white font-medium hover:bg-blue-600 transition duration-200 ease-in-out'>
            Submit
          </button>

        </div>
      </section>

      <h1 className='text-3xl font-medium mb-8'>Orders</h1>

      <section className="relative overflow-x-auto bg-white shadow-sm border-[1px] border-slate-100 rounded-sm max-h-[700px]">
        <table className="w-full text-sm text-left overflow-x-scroll">
          <thead className="text-xs sticky top-0 bg-white">
            <tr className='border-b border-slate-200'>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length !== 0 && (
              orders.map((order) => {
                return (
                  <tr key={order.id} className="bg-white border-b border-slate-200">
                    <th scope="row" className="px-6 py-4 font-medium">
                      {order.data.name}
                    </th>
                    <td className="px-6 py-4">
                      <div>Zip: {order.data.zip}</div>
                      <div>Country: {order.data.country}</div>
                      <div>City: {order.data.city}</div>
                      <div>Street: {order.data.street}</div>
                      <div>Email: {order.data.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {order.data.cart.map((item) => {
                        return (
                          <div className='pb-2 w-[150px] md:w-max' key={item.id} >
                            <div>Name: {item.title}</div>
                            <div>Qnty: {item.quantity}</div>
                            <div>Price: ${item.price}</div>
                          </div>
                        )
                      })}
                    </td>
                    <td className='px-6 py-4'>
                      <div>{new Date(order.data.timestamp.seconds * 1000).toLocaleDateString()}</div>
                      <div>{new Date(order.data.timestamp.seconds * 1000).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      ${order.data.sumPrice}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setOrderData(() => ({
                            id: order.id,
                            status: order.data.status
                          })),
                            setShowChangeStatus(true)
                        }}
                        className={`
                        ${order.data.status === "pending" && "bg-red-500 hover:bg-red-600"} 
                        ${order.data.status === "shipping" && "bg-blue-500 hover:bg-blue-600"} 
                        ${order.data.status === "delivered" && "bg-green-500 hover:bg-green-600"}
                        text-white rounded-lg font-medium flex gap-1 p-2 transition duration-200 ease-in-out`}>
                        {order.data.status}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </section>


    </main>
  )
}