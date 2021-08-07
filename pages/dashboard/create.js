// useState 
import {useState, useRef, useCallback, useEffect} from 'react'

// adminNav
import AdminNav from '../components/adminNav'

// footer 
import Footer from '../components/Footer'

// import upload widget 
import UploadWidget from '../../utils/articleUpload'

// import tinymice 
import { Editor } from '@tinymce/tinymce-react';

// import validations 
import Validations from '../../utils/validations'

// react hot toast
import toast, { Toaster } from 'react-hot-toast';

// Axios
import axios from '../../utils/axiosConfig';

// import AuthHoc 
import AuthHoc from '../../Hoc/authHoc'

// react date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





// Create Article Component 
const CreateArticle = () => {

    // init editorRef
    const editorRef = useRef(null)

    // init authorEditorRef
    const authorEditorRef = useRef(null)

    // init citationEditorRef
    const citationEditorRef = useRef(null)

    // affiliationEditorRef
    const affiliationEditorRef = useRef(null)


    // init useEffect
    useEffect(async() => {
            // fetch all volumes
            const {data} = await axios.get(`${process.env.API_ROOT}/volumes`)

            if(data.success) {
                // update Volume state 
                setVolumes(data.data)
            }
            
    }, [])




    // init ArticleData state
    const [ArticleData, setArticleData] = useState({
        title: "",
        volume: "",
        startPage: "",
        endPage: "",
        keywords: "",
        articleImage: "",

    })





    // init Volumes state 
    const [Volumes, setVolumes] = useState([])

    // init abstract state 
    const [abstract, setAbstract] = useState(null)

    // init authorState 
    const [author, setAuthor] = useState(null)

    // init citation state 
    const [citation, setCitation] = useState(null)

    // init insitutionalAffilition state 
    const [affiliation, setAffiliation] = useState(null)

    // init publishedDate state 
    const [publishedDate, setPublishedDate] = useState(new Date())

    // init updatedDate state 
    const [updatedDate, setUpdatedDate] = useState(new Date())


    // destructure ArticleData 
    const {title, volume, keywords, startPage, endPage, articleImage} = ArticleData

    // init articleFile state 
    const [articleFile, setArticleFile] = useState("")


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
     const handleEditorChange = useCallback((e) => {
            // update Abstract  
            setAbstract(e.target.getContent())
      }, [])


      // init handleAuthorChange func
      const handleAuthorChange = useCallback((e) => {

            // update Author
            setAuthor(e.target.getContent())
      }, [])


      // init handleCitationChange func
      const handleCitationChange = useCallback((e) => {

        // update Citation stae 
        setCitation(e.target.getContent())


      }, [])


      // init handleAffiliationChange 
      const handleAffiliationChange = useCallback((e) => {

            // update affliation
            setAffiliation(e.target.getContent())

      }, [])


      // init handleArticleFileUpload func
      const handleArticleFileUpload = (filePath) => {
          // update Article File state
          setArticleFile(filePath) 
          
      }





      // init handleSubmit 
      const handleSubmit = (e) => {
            // prevent Default 
            e.preventDefault()

            // update Loading state 
            setLoading(true)

            // get articleData 
            const articleData = {
                title: title,
                abstract: abstract,
                keywords: keywords,
                volume: volume,
                author: author, 
                citation: citation,
                affiliation: affiliation,
                startPage: startPage,
                endPage: endPage,
                article_image : articleImage, 
                article_file_url:  articleFile,
                publishedDate: publishedDate.toISOString(),
                updatedDate: updatedDate.toISOString()
                
            }


            // validate articleData
            const error = Validations.createArticle(articleData)

            // check if error 
            if(error) {
                // update Loading state 
                setLoading(false)

                return toast.error(error)
            }
            


            // axios to api endpoint
            axios.post(`${process.env.API_ROOT}/article`, articleData)
            .then(({data}) => {

                  // update Loading state 
                setLoading(false)

                if(!data.success) {
                    return toast.error(data.message)
                }
                
                // update ArticleData 
                setArticleData({...articleData, title: "", author: "", keywords: "", volume: "", citations: "", pages: "", articleImage: ""})

                // update ArticleFile 
                setArticleFile("")

                // update Abstract 
                setAbstract(null)

                // return success
                return toast.success(data.message)

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
        <AdminNav/>

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
                                <h1 className=" display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4 mb-4">Create Article</h1>
                                <form onSubmit={(event) => handleSubmit(event)}>
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
                                                initialValue="<p>Write or paste Author</p>"
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
                                                initialValue="<p>Write or paste Citations</p>"
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
                                                initialValue="<p>Write or paste Institutional Affliations</p>"
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


                                    

                                    {/* Abstract */}
                                    <div className="row mt-4">
                                        <div className="col-md-12 mt-4">
                                        <h5 className="form-label text-dark font" style={{fontWeight: 600}}>Abstract</h5>
                                           
                                            <Editor
                                                apiKey="b67cavk4n0xfvkqyxyc7xuw1153p9w9yiu79ko4ljk2l36lc"
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p>Write or paste Abstract</p>"
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
                                     <button type="submit" className="btn btn-success mt-4">Submit</button>
                                    }
                                   
                                </form>
                                </div>
                            </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                   

                </div>
            </div>
            
            

            <Footer/>
        </section>


        </>
    )
}




// export component 
export default AuthHoc(CreateArticle)