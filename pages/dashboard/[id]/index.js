// useState & useEffect
import {useState, useEffect, useRef, useCallback} from 'react'

// useRouter
import {useRouter} from 'next/router'

// Head 
import Head from 'next/head'

// adminNav
import AdminNav from '../../components/adminNav'

// footer 
import Footer from '../../components/Footer'

// import upload widget 
import UploadWidget from '../../../utils/articleUpload'

// import tinymice 
import { Editor } from '@tinymce/tinymce-react';

// react hot toast
import toast, { Toaster } from 'react-hot-toast';

// Axios
import axios from '../../../utils/axiosConfig';


// import AuthHoc 
import AuthHoc from '../../../Hoc/authHoc'


// react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";









// init DashboardDetail
const DashboardDetail = () => {
    
    // init useRouter
    const router = useRouter()

    const {id} = router.query

    // init editorRef
    const editorRef = useRef(null);

    // init authorEditorRef
    const authorEditorRef = useRef(null)

    // init citationEditorRef
    const citationEditorRef = useRef(null)

    // affiliationEditorRef
    const affiliationEditorRef = useRef(null)


    const articleId = id


    // init ArticleData state
    const [ArticleData, setArticleData] = useState({
        title: "",
        volume: "",
        keywords: "",
        startPage: "",
        endPage: "",
        articleImage: "",
        status: ""

    })

    // init articleRef
    const abstractRef = useRef(null)

    
    // init authorDataRef
    const authorDataRef = useRef(null)

    // init citationDataRef
    const citationDataRef = useRef(null)

    // init affiliationDataRef
    const affiliationDataRef = useRef(null)

    // init publishedDate state 
    const [publishedDate, setPublishedDate] = useState(new Date())

    // init updatedDate state 
    const [updatedDate, setUpdatedDate] = useState(new Date())



     // init useEffect
    useEffect(async() => {
        
        // get reponse data from endpoint
        const {data} = await axios.get(`${process.env.API_ROOT}/article/${articleId}`)

        // fetch all volumes
        const {data:volumeData} = await axios.get(`${process.env.API_ROOT}/volumes`)

        
        if(data && data.success) {

            // update article data
          setArticleData({...ArticleData,
            title: data.data.title,
            keywords: data.data.keywords,
            volume: data.data.volume,
            startPage: data.data.startPage,
            endPage: data.data.endPage,
            articleImage: data.data.article_image,
            status: data.data.status
           })

            console.log(data.data)

            // update abstractRef
            abstractRef.current = data.data.abstract

            // update authorRef
            authorDataRef.current = data.data.author

            // update citationRef
            citationDataRef.current = data.data.citation

            // update affliationRef
            affiliationDataRef.current = data.data.affiliation

            // update publicationDate
            setPublishedDate(new Date(data.data.publishedDate))

            // update updatedDate
            setUpdatedDate(new Date(data.data.updatedDate))


       
            // update article file
            setArticleFile(data.data.article_file_url)

            // update Volume state 
            setVolumes(volumeData.data)
        } 
        


    }, [articleId])



    // destructure ArticleData 
    const {title, volume, keywords, startPage, endPage, articleImage, status} = ArticleData

    // init articleFile state 
    const [articleFile, setArticleFile] = useState("")

    // init Volumes state 
    const [Volumes, setVolumes] = useState([])


    // init  Loading state 
    const [Loading, setLoading] = useState(false)


     //init cloudinaryWidget
    const cloudinaryWidget = () => {
        window.cloudinary
          .openUploadWidget({
            cloud_name: 'nursing-scope',
            upload_preset: 'z9jszaim'
          }, (error, result) => {
    
            //   check if error
            if (error) {
    
             return console.log(error)
            
            }
            
            // update ArticleData
            setArticleData({...ArticleData, articleImage: result[0].secure_url})

          })
    }

      // init handleChange func
    const handleChange = (data) => (event) => {
        // update ArticleData state 
        setArticleData({...ArticleData, [data]: event.target.value})

        
    }

    // init handleEditorChange func
    const handleEditorChange = (e) => {

        // update abstractRef
        abstractRef.current = e.target.getContent()

    }

    // init handleAuthorChange func
    const handleAuthorChange = (e) => {
        // update authorDataRef
        authorDataRef.current = e.target.getContent()
    }

    // init handleCitationChange func
    const handleCitationChange = useCallback((e) => {

        // update Citation ref 
        citationDataRef.current = e.target.getContent()


    }, [])


      // init handleAffiliationChange 
    const handleAffiliationChange = useCallback((e) => {

            // update affliation
            affiliationDataRef.current = e.target.getContent()

    }, [])



        // init handleArticleFileUpload func
    const handleArticleFileUpload = (filePath) => {
            // update Article File state
            setArticleFile(filePath) 
            
    }





    // init handleSubmit 
    const handleSubmit = (e) => {
        // prevent default
        e.preventDefault()

        // update Loading state 
        setLoading(true)

        // init updateArticle 
        const updateArticle = {
            title: title,
            author: authorDataRef.current,
            keywords: keywords,
            volume: volume,
            citation: citationDataRef.current,
            affiliation: affiliationDataRef.current,
            startPage: startPage,
            endPage: endPage,
            article_image: articleImage,
            article_file_url: articleFile,
            abstract: abstractRef.current,
            status: status,
            publishedDate: publishedDate.toISOString(),
            updatedDate: updatedDate.toISOString()
        }


        console.log(updateArticle)

        // axios put request to endpoint 
        axios.put(`${process.env.API_ROOT}/article/${articleId}`, updateArticle)
        .then(({data}) => {
            // update Loading state 
            setLoading(false)

            // check if not success
            if(!data.success) {
                return toast.error(data.message)
            }

            return toast.success(data.message)

        })
        .catch((error) => {
            // update Loading state 
            setLoading(false)

            console.log(error)
            return toast.error("Oops! An error has occurred")
        })
    }



    // init handleDeleteArticle 
    const handleDeleteArticle = () => {
        // get deleteArticleId
        const deleteArticleId = articleId

        // axios delete request to endpoint
        axios.delete(`${process.env.API_ROOT}/article/${deleteArticleId}`)
        .then(({data}) => {
            // check if not success
            if(!data.success) {
                return toast.error(data.message)
            }
            
            return router.push('/dashboard')
        })
        .catch((error) => {
            console.log(error)
            return toast.error("Oops! an erro has occurred")
        })
    }

    return (
        <>
        <AdminNav/>
        <Head>
            <title>Update Article| The Nursing Scope</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <Toaster/>
        <section className="py-3 dashboard-section" id="home">
            <div className="container mb-10">
                <div className="row align-items-center">
                   
                    <div className="col-md-12 col-sm-12">
                        
                        <div className="row align-items-center">
                            <div className="col"></div>
                            <div className="col-md-12 col-lg-10 pt-6 text-sm-start text-center">
                            
                                <div className="mt-5">
                                <div className="card table-card p-4">
                                <div className="row">
                                    <div className="col-md-8">
                                    <h1 className=" display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4 mb-4">Update Article</h1>
                                    </div>
                                    <div className="col-md-4">
                                        <button data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger float-end btn-sm pr-1 pl-1"><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
                                    </div>
                                </div>
                               
                                
                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <div className="mb-3">
                                    <label className="form-label text-dark">Select Status</label>
                                    <select className="form-select" value={status} onChange={handleChange('status')} aria-label="Default select example">
                                        <option value="">select status</option>
                                        <option value="published">Published</option>
                                        <option value="pending">Pending</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-dark">Title</label>
                                        <input type="text" onChange={handleChange('title')} value={title} placeholder="Title" className="form-control" required />
                                       
                                    </div>
                                   
                                    <div className="mb-3">
                                        <label className="form-label text-dark">Keywords</label>
                                        <input type="text"  onChange={handleChange('keywords')} value={keywords}  className="form-control" placeholder="Keywords"/>
                                    </div>

                                   
                                    
                                    <div className="mb-3">
                                        <label className="form-label text-dark">Start Page</label>
                                        <input type="text"  onChange={handleChange('startPage')} value={startPage}  className="form-control" placeholder="Pages e.g 1"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-dark">End Page</label>
                                        <input type="text"  onChange={handleChange('endPage')} value={endPage}  className="form-control" placeholder="Pages e.g 9"/>
                                    </div>


                                    <div className="mb-3">
                                        <label className="form-label text-dark">Volume</label>
                                        <select onChange={handleChange('volume')} className="form-select" aria-label="Default select example">
                                            <option value="">Select Volume/Issue</option>
                                            {Volumes.map((vol, index) => {
                                                return <option key={index} value={vol.id}>{vol.volume} {vol.issue}</option>
                                            })}
                                           
                                            
                                        </select>
                                       
                                    </div>
                                    
                                    {/* UPLOADS */}
                                    <div className="row">
                                        <div className="col-lg-6 mt-3 col-md-6 col-sm-12">
                                            
                                            <button onClick={() => cloudinaryWidget()} type="button" className="btn btn-outline-secondary btn-lg text-dark">Upload Article Cover Image</button>
                                           <p style={{fontSize: 13}}>{articleImage && "Article cover image uploaded successfully"}</p>
                                        </div>
                                        <div className="col-lg-6 mt-3 col-md-6 col-sm-12">
                                                <UploadWidget articleFilePath = {(filePath) => handleArticleFileUpload(filePath)}/>
                                                <p style={{fontSize: 13}}>{articleFile && "Article file uploaded successfully"}</p>
                                        </div>
                                    </div>
                                    

                                     {/* Author */}
                                     <div className="row">
                                        <div className="col-md-12 mt-4">
                                            <h5 className="form-label text-dark font" style={{fontWeight: 600}}>Author</h5>
                                           
                                            <Editor
                                                apiKey="b67cavk4n0xfvkqyxyc7xuw1153p9w9yiu79ko4ljk2l36lc"
                                                onInit={(evt, editor) => authorEditorRef.current = editor}
                                                initialValue={authorDataRef.current}
                                                init={{
                                                height: 200,
                                                menubar: true,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                
                                                }}
                                                onChange={handleAuthorChange}
                                            />
                                                
                                        </div>
                                    </div>


                                    


                                     {/* Citation */}
                                     <div className="row mt-4">
                                        <div className="col-md-12 mt-4">
                                        <h5 className="form-label text-dark font" style={{fontWeight: 600}}>Citation</h5>
                                           
                                            <Editor
                                                apiKey="b67cavk4n0xfvkqyxyc7xuw1153p9w9yiu79ko4ljk2l36lc"
                                                onInit={(evt, editor) => citationEditorRef.current = editor}
                                                initialValue={citationDataRef.current}
                                                init={{
                                                height: 200,
                                                menubar: true,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                
                                                }}
                                                onChange={handleCitationChange}
                                            />
                                                
                                        </div>
                                    </div>



                                            
                                    {/* Affiliation */}
                                    <div className="row mt-4">
                                        <div className="col-md-12 mt-4">
                                        <h5 className="form-label text-dark font" style={{fontWeight: 600}}>Institutional Affliation</h5>
                                           
                                            <Editor
                                                apiKey="b67cavk4n0xfvkqyxyc7xuw1153p9w9yiu79ko4ljk2l36lc"
                                                onInit={(evt, editor) => affiliationEditorRef.current = editor}
                                                initialValue={affiliationDataRef.current}
                                                init={{
                                                height: 200,
                                                menubar: true,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                
                                                }}
                                                onChange={handleAffiliationChange}
                                            />
                                                
                                        </div>
                                    </div>





                                        {/* ABSTRACT */}
                                    <div className="row">
                                        <div className="col-md-12 mt-4">
                                            <label className="form-label text-dark">Abstract</label>
                                           
                                            <Editor
                                                apiKey="b67cavk4n0xfvkqyxyc7xuw1153p9w9yiu79ko4ljk2l36lc"
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue={abstractRef.current}
                                                init={{
                                                height: 500,
                                                menubar: true,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                
                                                }}
                                                onChange={handleEditorChange}
                                            />
                                                
                                        </div>
                                    </div>


                                     {/* DATE */}
                                     <div className="row mt-4">
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                        <label className="form-label text-dark date-label">Published Date</label>
                                        <DatePicker className="form-control" selected={publishedDate} onChange={(date) => setPublishedDate(date)} />
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                        <label className="form-label text-dark date-label">Updated Date</label>
                                        <DatePicker className="form-control" selected={updatedDate} onChange={(date) => setUpdatedDate(date)} />
                                        </div>

                                    </div>



                                    {Loading?  <button type="button" className="btn btn-success mt-4" disabled><div className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"> Loading...</span></div> Loading...</button> : 
                                     <button type="submit" className="btn btn-success mt-4">Update</button>
                                    }
                                   
                                </form>
                                </div>
                            </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                   
                    <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" >
                            <div className="modal-content" style={{borderRadius: "0.4rem"}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Article</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               Do you want to delete this article?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={() => handleDeleteArticle()} data-bs-dismiss="modal" className="btn btn-danger">Yes, Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            

            <Footer/>
        </section>
       
        </>
    )
}



export default AuthHoc(DashboardDetail)