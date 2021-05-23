
// useRouter
import {useRouter} from 'next/router'

// Head
import Head from 'next/head'

// Navbar 
import Navbar from '../../components/Navbar'

// Footer 
import Footer from '../../components/Footer'

// useEffect & useState 
import {useState, useEffect} from 'react'

// react loading skeleton
import Skeleton from 'react-loading-skeleton';

// hot toast
import toast, { Toaster } from 'react-hot-toast';
 
// date fns 
import {format} from 'date-fns'

// ReactHtmlParser
import ReactHtmlParser from 'react-html-parser';

// axios 
import axios from 'axios'



// init Article Detail
const ArticleDetail = () => {

    // init router
    const router = useRouter()

    // get id
    const {id} = router.query

    // init articleId 
    const articleId = id

    console.log(articleId)

    // init useEffect
    useEffect(async() => {
        // init axios request to get single article endpoint
        const {data} = await axios.get(`${process.env.API_ROOT}/article/${articleId}`)

        // check if success
        if(data.success) {
            // update Article state 
            setArticle(data.data)

            console.log(data.data)
        }
        
    }, [articleId])

    // init Article state 
    const [Article, setArticle] = useState({})


    return (
        <>
            <Navbar/>

            <Head>
                <title>{Article.title}</title>
            </Head>

            <Toaster/>

            <section className="py-0" id="home">
            <div className="container mb-8">
                <div className="row align-items-center">
                    <div className="col"></div>
                    <div className="col-md-12 col-sm-12 mt-8 filter-style-detail">
                        <div className="row align-items-center">
                            
                            <div className="col-md-8 col-lg-8  text-sm-start text-center">
                            <div className="card table-card">
                                <div className="card-body p-4">
                                    <h1 className="card-title display-4 fw-semi-bold lh-sm fs-2 fs-lg-2 fs-xxl-2 ">{Article.title || <Skeleton count={2} />}</h1>
                                    <h6 className="card-subtitle mb-2 mt-4 text-black article-subtitle-detail">
                                        {Article.author ? <> <b>Authors:</b> {Article.author} </>: 
                                            <Skeleton count={1} />
                                        }
                                       
                                       
                                    </h6>
                                    <h6 className="card-subtitle mb-2 mt-2 text-black article-subtitle-detail">
                                    {Article.createdAt ? <> <b>Published Date:</b> {format(new Date(Article.createdAt), 'dd-MM-yyyy')} </>: 
                                        <Skeleton count={1} />
                                    }
                                    </h6>

                                    <h6 className="card-subtitle mb-2 mt-2 text-black article-subtitle-detail">
                                    {Article.volume ? <> <b>Volume:</b> {Article.volume} </>: 
                                       <Skeleton count={1} />
                                    }
                                    </h6>

                                   

                                    <h6 className="card-subtitle mb-2 mt-4 text-black article-subtitle-detail">
                                        {Article.keywords ? <> <b>Keywords:</b> {Article.keywords} </>:
                                         <Skeleton count={2} />
                                        }
                                      
                                        
                                    </h6>
                                  
                                </div>

                            </div>
                          
                            </div>

                            <div className="col-md-4 pt-3 text-sm-start text-center">
                                <div className="row">
                                    <div className="col-md-12">
                                <div className="card table-card">
                                    <div className="card-body p-3">
                                        <div className="col"></div>
                                        <div className="col-md-12">
                                            {Article.article_image ? <img src={Article.article_image} className="img-fluid article-image-detail"/> : 
                                            <img src="/assets/img/noimage.png" className="img-fluid article-image-detail"/>
                                            }
                                            
                                            <div className="d-grid gap-2">
                                                <a href={`${process.env.API_CORE_ROOT}/${Article.article_file_url}`} target="_blank" className="btn btn-outline-success mt-4">Download full-text PDF</a>
                                            </div>
                                           
                                        </div>
                                        <div className="col"></div>
                                    </div>
                               </div>
                               </div>

                                </div>
                            </div>
                        </div>

                        {/* abstract */}
                        <div className="row">
                            <div className="col-md-12">
                                 {/* Abstract Section */}
                                <div className="card table-card mt-3">
                                    <div className="card-body p-4">
                                        <h1 className="card-title display-4 fw-semi-bold lh-sm fs-2 fs-lg-2 fs-xxl-2 ">ABSTRACT</h1>
                                        
                                        {Article.abstract ? <h6 className="card-subtitle mb-2 mt-4 text-black article-subtitle-detail ">
                                           {ReactHtmlParser(Article.abstract)}
                                        </h6> : 
                                            <Skeleton count={8} />
                                        }
                                        
                                        
                                    </div>

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



// export 
export default ArticleDetail