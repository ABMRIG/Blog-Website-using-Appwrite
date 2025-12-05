import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//the AuthLayout component is created to keep check if the user is authenticated or not so that if a page can be shown to a user. The authentication prop is sent from the main.jsx

function Protected({children, authentication = true}) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
      if (authentication && authStatus !== authentication){
        navigate("/login")
      }
      else if (!authentication && authStatus !== authentication){
        navigate("/")
      }
      setLoader(false);
      
    }, [authentication, authStatus, navigate]
)
    

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected


