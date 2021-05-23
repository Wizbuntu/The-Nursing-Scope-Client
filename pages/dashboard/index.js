// adminNav
import AdminNav from '../components/adminNav'

// footer 
import Footer from '../components/Footer'

// axios 
import axios from '../../utils/axiosConfig'

// useRouter
import Link from 'next/link'

// useEffect 
import {useEffect, useState, Fragment, useRef} from 'react'

// react truncate
import Truncate from 'react-truncate';

//Mini Search
import MiniSearch from 'minisearch'

// import AuthHoc 
import AuthHoc from '../../Hoc/authHoc'



// Dashboard component 
const Dashboard = () => {

    // init useEffect 
    useEffect(async() => {
        // fetch all articles
        const {data} = await axios.get(`${process.env.API_ROOT}/article`)
        
        // update Articles state 
        setArticles(data.data.articles)

        // update articleRef
        articleRef.current = data.data.articles

        console.log(data.data.articles)
    
    }, [])

    // init Articles state 
    const [Articles, setArticles] = useState([])

    // init useRef
    const articleRef = useRef([])


    // init min search
    let miniSearch = new MiniSearch({
        fields: ['title', 'author', 'status'], 
        storeFields: ['title', 'status', 'author','article_image']
    })

    // Index all documents
    miniSearch.addAll(articleRef.current)



    // init handleSearch 
    const handleSearch = (searchQuery) => {
        // check if searchQuery
        if(searchQuery) {

            // get result from search
            let result = miniSearch.search(searchQuery)

           // update Article state 
           setArticles(result)
        } else {
            // update article state
            setArticles(articleRef.current)
        }
      
    }


    // init handleFilter func 
    const handleFilter = (filterQuery) => {

        //check if filterQuery
        if(filterQuery) {

            // get result from filter
           let result = articleRef.current.filter((_article) => _article.status === filterQuery)

           // update Articles state
           setArticles(result)
            
        } else {
            // update article state 
            setArticles(articleRef.current)
        }
    }


    return (
        <>
        <AdminNav/>
        <section className="py-0 dashboard-section" id="home">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col"></div>
                    <div className="col-md-10 col-sm-12">
                        <div className="row align-items-center">
                            
                            <div className="col-md-8 col-lg-8 pt-6 text-sm-start text-center">
                                <div className="mt-8">
                                    <form>
                                        <div className="input-group d-flex flex-end-center">
                                            <input className="form-control rounded-pill border-0 font-base" onChange={(event) => handleSearch(event.target.value)} id="formGroupExampleInput" height="200" type="text" placeholder="search article by title or author" /><img className="input-box-icon me-3" src="assets/img/illustrations/search.png"
                                                width="18" alt="" />
                                        </div>
                                    </form>
                                </div>
                          
                            </div>

                            <div className="col-md-4 filter-style text-sm-start text-center">
                               
                                <select onChange={(event) => handleFilter(event.target.value)} className="form-select rounded-pill" aria-label="Default select example">
                                        <option value="">select filter</option>
                                        <option value="pending">Pending</option>
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                </select>
                               
                            
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>

                </div>
            </div>
            
            {/* Article list */}
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-6 mb-4">
                    <Link href="/dashboard/create"><button className="btn  btn-primary article-create-btn"><i className="fa fa-plus" aria-hidden="true"></i> Create Article</button></Link>
                    <h1 className="display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4">All Articles</h1>
                
                    </div>
                </div>
                <div className="row">

                    {Articles.length === 0 ? <div className="container pb-5">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-md-8 mt-5">
                                    <h1 className="text-center text-muted display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4">Result Empty</h1>
                            </div>
                            <div className="col"></div>
                        </div>
                        
                    </div> : 
                    <>

                        {Articles.map((article, index) => {
                            return <Fragment key={index}>

                            <div className="col-lg-3 col-md-4 col-sm-12 mt-4">
                                <div className="card table-card">
                                    {article.article_image ?  <img src={article.article_image} className=" img-fluid article-img" alt="article-cover" /> : 
                                     <img src="/assets/img/noimage.png" className=" img-fluid article-img" alt="article-cover" />
                                    }
                                   
                                    
                                
                                    <div className="card-body p-3">
                                    <Link href={`/dashboard/${article.id}`}><a className="card-title article-title"><Truncate lines={2} ellipsis={<span>...</span>}>{article.title}</Truncate></a></Link>
                                    <h6 className="card-subtitle mb-2 mt-2 text-muted article-subtitle">
                                        {article.status === "pending" ? <span className="badge bg-warning">Pending</span> : 
                                            article.status === "published"? <span className="badge bg-success">Published</span> : 
                                            article.status === "draft" ? <span className="badge bg-danger">Draft</span> : 
                                            <span className="badge bg-secondary">loading...</span>
                                        }
                                        
                                    </h6>
                                    
                                
                                    <p className="card-text fs-sm article-author "><Truncate lines={1} ellipsis={<span>...</span>}>{article.author}</Truncate></p>
                                    </div>
                                </div>
                            </div>

                            </Fragment>
                        })}



                    </>
                    }

                    
                   
                   
                </div>
                <div className="row pt-7 mb-6">
                    {/* <div className="col-md-12 text-center">
                            <button className="btn btn-success text-center">Load More</button>
                    </div> */}
                </div>
                
            </div>

            <Footer/>
        </section>

        </>
        )
    
}


// export Dashboard
export default AuthHoc(Dashboard)