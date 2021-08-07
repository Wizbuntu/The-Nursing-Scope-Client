
// import Head
import Navbar from '../../components/Navbar'

// import Head 
import Head from 'next/head'

// import Footer
import Footer from '../../components/Footer'

// useEffect & useState 
import {useEffect, useState, Fragment} from 'react'

// Link
import Link from 'next/link'

// router
import {useRouter} from 'next/router'

// axios
import axios from 'axios'

// react loading skeleton
import Skeleton from 'react-loading-skeleton';

// lodash
import _ from 'lodash'




// init IssueDetail component
const IssueDetail = () => {
    // router
    const router = useRouter()

    // destructure id from router query
    const {id} = router.query

    console.log(id)

    // get volumeId
    const volumeId = id

    // init _articles
    let _articles = []

    // init useEffect
    useEffect(async() => {
        // fetch all articles with volume Id
        const {data} = await axios.get(`${process.env.API_ROOT}/articles/volume/${volumeId}`)

        // update Loading state 
        setLoading(false)

        // check if success
        if(data.success) {
            
            // init _articles
            _articles = data.data

            // sortArticles
            const sortedArticles = _.sortBy(_.sortBy(_articles, a => !isNaN(parseInt(a.startPage)), 'startPage'))

            console.log(sortedArticles)

            // update Articles state 
            setArticles(sortedArticles)
        }
    }, [id])

    // init Articles state 
    const [Articles, setArticles] = useState([])

    // init Loading state
    const [Loading, setLoading] = useState(true)


    return (
        
       <>

            <Navbar/>
            <section className="py-0" id="home">
           

                    <div className="container">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12">
                                <div className="row align-items-center min-vh-md-75">
                                    <div className="col-md-12 col-lg-12 pt-6 mt-8 mb-8 text-center">
                                    <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-9">
                                            {Loading ? <Skeleton count={5} /> : 
                                            
                                            Articles.length === 0? 
                                                <div className="container mb-8 mt-8">
                                                <h1 className="fw-semi fs-3 text-center">No Recent Articles Found</h1> 
                                                </div>
                                                : 
                                            Articles.map((article, index) => {
                                                return <Fragment key={index}>
                                                        <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item mb-5 border border-x-0 border-bottom-0 border-200">
                                                        <div className="accordion-header" id="heading1">
                                                            <div className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                                <div className="row w-100 justify-content-center">
                                                                    <div className="col-sm-12 font-base"><Link href={`/${article.slug}/${article.id}`}><span className="mb-0 fw-bold text-start fs-1 text-1200">{article.title}</span></Link>
                                                                        <div className="my-2" dangerouslySetInnerHTML={{__html: article.author}} />

                                                                        <p className="fs-sm">Page: {`${article.startPage} ${article.endPage && `- ${article.endPage}`}`}</p>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            

            
            <Footer/>


       </>
    )
}


// export component
export default IssueDetail