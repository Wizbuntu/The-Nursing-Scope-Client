// import Navbar
import Navbar from './components/Navbar'

// Footer 
import Footer from './components/Footer'

// axios 
import axios from 'axios'

// useEffect 
import {useEffect, useState, Fragment} from 'react'

// Link 
import Link from 'next/link'

// react loading skeleton
import Skeleton from 'react-loading-skeleton';

// init Home component
export default function Home() {

    // init useEffect 
    useEffect(async() => {
        // get articles
        const {data} = await axios.get(`${process.env.API_ROOT}/article`)

        // update Loading status 
        setLoading(false)

        // check if success
        if(data.success) {
            // update Articles state 
            setArticles(data.data.publishedArticles)
        }

        console.log(data.data)
        
    }, [])


    // init useState 
    const [Articles, setArticles] = useState([])

    // init Loading state 
    const [Loading, setLoading] = useState(true)

  return (
    <>
      <Navbar/>

      <section className="py-0" id="home">
            <div className="container">
                <div className="row align-items-center min-vh-md-75">
                    <div className="col-md-6">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12 col-lg-12 py-6 text-sm-start text-center">
                                <h1 className="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">The Nursing Scope</h1>
                                <p className="mb-4 fs-1">The Publication of the University Graduates of Nursing Science Association (UGONSA) </p>
                                <div className="pt-3">
                                    <Link href="/articles"><button className="btn btn-success">Get Started</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">

                        <img src="/assets/img/gallery/new_nursing_scope.png" className="img-fluid journal-cover" />


                    </div>

                </div>
            </div>
        </section>


        <section className="py-8" id="books">

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 text-center mb-7">
                        <h1 className="fw-semi-bold">Recent Articles</h1>
                    </div>
                    <div className="col-lg-9">
                        {Loading ? <Skeleton count={5} /> : 
                        
                        Articles.length === 0 ? 
                            <h1 className="fw-semi fs-3 text-center">No Recent Articles Found</h1> 
                            : 
                        Articles.splice(-4).map((article, index) => {
                            return <Fragment key={index}>
                                    <div className="accordion" id="accordionExample">
                                <div className="accordion-item mb-5 border border-x-0 border-bottom-0 border-200">
                                    <div className="accordion-header" id="heading1">
                                        <div className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                            <div className="row w-100 justify-content-center">
                                                <div className="col-sm-12 font-base"><Link href={`/${article.slug}/${article.id}`}><span className="mb-0 fw-bold text-start fs-1 text-1200">{article.title}</span></Link>
                                                    <p className="my-2">{article.author}</p>
                                                </div>
            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </Fragment>
                        })
                        
                        
                        }
                        
                        
                    </div>
                   
                </div>
            </div>


            </section>

      <Footer/>
    </>

  )
}



