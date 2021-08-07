// import Head
import Navbar from '../components/Navbar'

// import Head 
import Head from 'next/head'

// import Footer
import Footer from '../components/Footer'

// useEffect & useState 
import {useEffect, useState, Fragment} from 'react'

// Link
import Link from 'next/link'


// axios
import axios from 'axios'

// Issues component 
const  Issues  = () => {

    // init useEffect
    useEffect(async() => {
            const {data} = await axios.get(`${process.env.API_ROOT}/volumes`)

            if(data.success) {
                // update Volume state 
                setVolumes(data.data)
            }
    }, [])

    // init Volume state
    const [Volumes, setVolumes] = useState([])

    return (
        <>

            <Navbar/>

            <Head>
                <title>Issues | The Nursing Scope</title>
            </Head>


            <section className="py-5" id="home">
        
                    <div className="container">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12">
                            <section id="libraries">
                            
                                <div className="container">
                                    <div className="row g-xl-0 align-items-center">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fw-semi-bold text-black">Issues</h1>
                                           
                                           
                                        </div>
                                    </div>



                                    <div className="row g-xl-0 align-items-center mt-5">
                                        {Volumes.map((vol, index) => {
                                            return <Fragment key={index}>

                                            <hr/>
                                            <div className="col-md-12 col-lg-12 mb-3 text-md-start offset-lg-1 offset-xxl-0">
                                              <Link href={`/issues/${vol.id}`}><h5 className="fs-2 text-black" style={{cursor: "pointer"}}>{vol.volume} <span className="text-success">{vol.issue}</span> -  {vol.date}</h5></Link>
                                            </div>
                                           

                                            </Fragment>
                                        })}
                                        
                                       
                                    </div>



                                   
                                </div>
                            </section>
                            </div>
                        </div>
                    </div>
                </section>


            <Footer/>

        </>
    )
}


//export about component 
export default Issues