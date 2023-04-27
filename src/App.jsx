import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { db } from "./firebase/firebase"
import { ToastContainer } from "react-toastify"
import { OrdersContext } from './context/OrdersContext'
import { useEffect, useState } from "react"
import { collection, query, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersArray = []
      querySnapshot.forEach((doc) => {
        ordersArray.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setOrders(ordersArray)
    })

    return () => unsubscribe
  }, [])

  return (
    <OrdersContext.Provider value={{ orders: orders }}>
      <div className='App'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<ProtectedRoute />} >
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </OrdersContext.Provider>

  )
}

export default App
