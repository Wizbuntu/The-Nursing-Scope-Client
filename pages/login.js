// import Head 
import Head from 'next/head'

// import Navbar
import Navbar from './components/Navbar'

// Footer 
import Footer from './components/Footer'


//Login component 
const Login = () => {

    return (
        <>

        <Navbar/>

        <Head>
                <title>Login | The Nursing Scope</title>
        </Head>

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
                                    <form>
                                        
                                        <div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center" style={{display: 'block', margin: 'auto'}}>
                                               
                                            <input className="form-control text-center rounded-pill border-0 font-base" height="200" type="email" placeholder="Email Address" required/>
                                                
                                        </div>

                                        <div className="input-group mt-3 w-xl-75 w-xxl-50 d-flex flex-end-center" style={{display: 'block', margin: 'auto'}}>
                                               
                                               <input className="form-control text-center rounded-pill border-0 font-base" height="200" type="password" placeholder="Password" required/>
                                                   
                                        </div>
                                        <div className="d-grid gap-2 w-xl-75 w-xxl-50" style={{margin: "auto", display: 'block'}}>
                                        <button className="btn btn-success mt-3 rounded-pill border-0 font-base">Login to Continue</button>
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


