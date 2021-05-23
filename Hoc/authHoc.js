// import axios 
import axios from '../utils/axiosConfig'

// import useEffect & useState 
import {useEffect, useState } from 'react'

// import router
import { useRouter } from 'next/router'



// init AuthHoc component 
const AuthHoc = (Component) => {
    return ((props) => {

    // init Router 
    const Router = useRouter()

    // init isAuth state 
    const [isAuth, setIsAuth] = useState(false)
    
    // init useEffect
    useEffect(async() => {
            // verify auth
        const {data} = await axios.get(`${process.env.API_ROOT}/verify/user`)
    
        
        //check if not authenticated
        if(!data.success) {
           return Router.replace('/login')
        }

        // update isAuth 
        setIsAuth(true)

    
    }, [])

    if(isAuth) {
        return <Component {...props} />
    } else {
        return (
            <div className="text-center" style={{marginTop: "18rem"}}>
            <div className="spinner-border" role="status">
               
              
            </div>
            <p className="sr-only">Loading...</p>
            </div>
        )
    }

    

    })
   

}

export default AuthHoc