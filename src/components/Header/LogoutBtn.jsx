import React from 'react'
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        authService.logout().then(()=>{dispatch(logout())})
    }

    return (
        <button className="bg-red-900 m-1 inline-block px-6 py-2 font-bold duration-200 hover:bg-red-600 rounded-full" 
                onClick={logoutHandler}>Logout</button>
    )
}

export default LogoutBtn