import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function AuthStatus() {

    // If the admin logged in then set the loggenIn to true and the checkingStatus to false
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    // OnAuthStateChanged is listen the admin auth.
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
            setCheckingStatus(false)
        })
    }, [])

    return { loggedIn, checkingStatus }
}