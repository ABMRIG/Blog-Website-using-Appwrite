import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

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







// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// function Protected({ children, authentication = true }) {
//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)
//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         // If authentication is required but user is not authenticated
//         if (authentication && !authStatus) {
//             navigate("/login")
//         }
//         // If authentication is not required but user is authenticated
//         else if (!authentication && authStatus) {
//             navigate("/")
//         }
//         setLoader(false)
//     }, [authStatus, authentication, navigate])

//     return loader ? <h1>Loading...</h1> : <>{children}</>
// }

// export default Protected
