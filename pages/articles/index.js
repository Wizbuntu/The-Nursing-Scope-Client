// import Head
import Navbar from '../components/Navbar'

// import Head 
import Head from 'next/head'

// axios 
import axios from 'axios'

// import Footer
import Footer from '../components/Footer'

// useEffect 
import {useEffect, useState, Fragment} from 'react'

// Link 
import Link from 'next/link'

// router
import {useRouter} from 'next/router'


// react loading skeleton
import Skeleton from 'react-loading-skeleton';

// loadash
import _ from 'lodash'



// Article Component 
const Article = () => {

    // init router
    const router = useRouter()

    // init useEffect 
    useEffect(async() => {
        // invoke fetchData func
        await fetchData(Pages)
        
    }, [])

     // init useState 
    const [Articles, setArticles] = useState([])


    // init Loading state 
    const [Loading, setLoading] = useState(true)

    // init Pages
    const [Pages, setPages] = useState(1)

    // init PageTotal state 
    const [PageTotal, setPageTotal] = useState(0)

    // init disableLoadMore state 
    const [disableLoadMore, setDisableLoadMore] = useState(false)

    // init searchQueryText state 
    const [searchQueryText, setSearchQueryText] = useState("")


    // init _articles
    let _articles = []

    // init fetchData function 
    const fetchData = async(pageNum) => {
        // get articles
        const {data} = await axios.get(`${process.env.API_ROOT}/search/articles?page=${pageNum}`)

        // update Loading status 
        setLoading(false)

        // check if success
        if(data.success) {
            
            // init _articles
            _articles = data.articles

            // sortArticles
            const sortedArticles = _.sortBy(_.sortBy(_articles, a => !isNaN(parseInt(a.startPage)), 'startPage'))

            console.log(sortedArticles)

            // update Articles state 
            setArticles((articles) => [...articles, ...sortedArticles])

            // update pageTotal state 
            setPageTotal(data.total)

            console.log(data)

        }
    }

    // init fetchSearchData function 
    const fetchSearchData = async(searchText) => {
        // get articles
        const {data} = await axios.get(`${process.env.API_ROOT}/search/articles?search=${searchText}`)

        // update Loading status 
        setLoading(false)

        // check if success
        if(data.success) {
            // update Articles state 
            setArticles(data.articles)

        }

    }

    // init handleSearch func 
    const handleSearch = async(searchText) => {
         // check if searchQuery
         if(searchText) {
             // update Search Query Text state 
            setSearchQueryText(searchText)

            // invoke fetchSearchData
             await fetchSearchData(searchText)

            // update DisableLoadMore state 
            setDisableLoadMore(true)
           
        } else {
            // reload page
            router.reload()
        }
       
    }


    // init LoadMore func
    const loadMore = async() => {
       // get pageNum 
       const pageNum = Pages + 1

       // invoke fetchData func
       await fetchData(pageNum)

       // update Pages state 
       setPages(pageNum)

       console.log(Articles.length)
    }

    return (
        <>
                <Navbar/>

                <Head>
                    <title>Articles | The Nursing Scope</title>
                </Head>

                <section className="py-0" id="home">
           

                    <div className="container">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12">
                                <div className="row align-items-center min-vh-md-75">
                                    <div className="col-md-12 col-lg-12 pt-6 text-center">
                                        <h1 className="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">Articles</h1>
                                        <div className="pt-3">
                                            <form>
                                                <div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center search-bar">
                                                    <input onChange={(event) => handleSearch(event.target.value)} className="form-control rounded-pill border-0 font-base" id="formGroupExampleInput" height="200" type="text" placeholder="Search Article" /><img className="input-box-icon me-3" src="assets/img/illustrations/search.png"
                                                        width="18" alt="" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section id="books" className="pt-0">

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-12text-center mb-7">
                                {searchQueryText && <h1 className="fw-small-bold fs-sm-3">Search Results For - {searchQueryText}</h1>}
                                
                            </div>
                            <div className="col-lg-9">
                        {Loading ? <Skeleton count={5} /> : 
                        
                        Articles.length === 0 ? 
                            <h1 className="fw-semi fs-3 text-center">No Recent Articles Found</h1> 
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
                    {!disableLoadMore && <div className="col-lg-12 d-flex justify-content-center">
                                {Articles.length !== PageTotal && <button type="button" onClick={() => loadMore()} className="btn btn-lg btn-success rounded-pill font-base" type="submit">View More Articles </button>}
                                
                            </div>}
                            
                        </div>
                    </div>


                    </section>



                <Footer/>
        </>
    )
}




// export Article
export default Article