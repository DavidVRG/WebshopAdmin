import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthStatus } from './AuthStatus'
import Loading from '../Utils/Loading'

export default function ProtectedRoute() {

    // Import loggedIn and checkingStatus from AuthStatus
    const { loggedIn, checkingStatus } = AuthStatus()

    // If the checkingstatus true then the app show the loading component
    if (checkingStatus) {
        return <Loading />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}