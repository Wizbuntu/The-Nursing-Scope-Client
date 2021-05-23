// import Head 
import Head from 'next/head'

// import Navbar
import Navbar from './components/Navbar'

// Footer 
import Footer from './components/Footer'

// validations 
import validations from '../utils/validations'

// hot toast
import toast, { Toaster } from 'react-hot-toast';

// axios 
import axios from '../utils/axiosConfig'

// cookie js
import Cookie from 'js-cookie'

// useState
import {useState} from 'react'

// router
import Router from 'next/router'


//Login component 
const Login = () => {

    // init login state 
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    // Loading state 
    const [Loading, setLoading] = useState(false)
    
    // destructure login 
    const {email, password} = loginData

    // init handleChange 
    const handleChange = (data) => (event) => {
        // update login data 
        setLoginData({...loginData, [data]: event.target.value})

        
    }

    // init handleSubmit 
    const handleSubmit = (event) => {
        // prevent default 
        event.preventDefault()

        // update Loading state 
        setLoading(true)

       // get login data
       const _loginData = {
           email,
           password
       }

       // validate _loginData
       const error = validations.validateLogin(_loginData)

       // check if error
       if(error) {
           // update Loading state 
           setLoading(false)

           return toast.error(error)
       }

       // axios request to login endpoint
       axios.post('http://localhost:3001/v1/api/login', _loginData)
       .then(({data}) => {

           // update Loading state 
           setLoading(false)

           // check if success
           if(!data.success){
               return toast.error(data.message)
           }

           // set cookie 
           Cookie.set('TNS-AUTH-KEY', data.token, {expires: 7})

           // return success toast 
           return Router.push('/dashboard')
       })
       .catch((error) => {
           // update Loading state 
           setLoading(false)

           console.log(error)
           return toast.error("Oops! an error has occurred")
       })
       
    }

    return (
        <>

        <Navbar/>

        <Head>
                <title>Login | The Nursing Scope</title>
        </Head>

        <Toaster/>

         <section className="py-0" id="home">
            <div className="container">
                <div className="row align-items-center min-vh-md-75">
                    <div className="col"></div>
                    <div className="col-md-6">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12 col-lg-12 py-6 text-center">
                                <h1 className="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">Login</h1>
                                <p className="mb-4 fs-1"></p>
                                <div className="pt-3">
                                    <form onSubmit={(event) => handleSubmit(event)}>
                                        
                                        <div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center" style={{display: 'block', margin: 'auto'}}>
                                               
                                            <input className="form-control text-center rounded-pill border-0 font-base" height="200" value={email} onChange={handleChange('email')} type="email" placeholder="Email Address" required/>
                                                
                                        </div>

                                        <div className="input-group mt-3 w-xl-75 w-xxl-50 d-flex flex-end-center" style={{display: 'block', margin: 'auto'}}>
                                               
                                               <input className="form-control text-center rounded-pill border-0 font-base" height="200" value={password} onChange={handleChange('password')} type="password" placeholder="Password" required/>
                                                   
                                        </div>
                                        <div className="d-grid gap-2 w-xl-75 w-xxl-50" style={{margin: "auto", display: 'block'}}>
                                        {Loading ? <button type="button" className="btn btn-success mt-3 rounded-pill border-0 font-base" disabled><div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"> Loading...</span></div> Loading...</button> : 
                                        <button type="submit" className="btn btn-success mt-3 rounded-pill border-0 font-base">Login to Continue</button>
                                        }
                                        
                                        </div>
                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                   

                </div>
            </div>
        </section>

        <Footer/>

        </>
    )
}


// export default 
export default Login


