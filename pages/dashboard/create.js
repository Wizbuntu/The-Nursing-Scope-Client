// useState 
import {useState, useRef, useCallback} from 'react'

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





// Create Article Component 
const CreateArticle = () => {

    // init editorRef
    const editorRef = useRef(null);


    // init ArticleData state
    const [ArticleData, setArticleData] = useState({
        title: "",
        author: "",
        volume: "",
        keywords: "",
        articleImage: "",

    })

    // init abstract state 
    const [abstract, setAbstract] = useState(null)

    // destructure ArticleData 
    const {title, author, volume, keywords, articleImage} = ArticleData

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
                title,
                abstract,
                keywords, 
                volume,
                author, 
                article_image : articleImage, 
                article_file_url:  articleFile,
                
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
                setArticleData({...articleData, title: "", author: "", keywords: "", volume: "", articleImage: ""})

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
                                        <label className="form-label text-dark">Author(s)</label>
                                        <input type="text"  onChange={handleChange('author')} value={author}  className="form-control" placeholder="Author" required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-dark">Keywords</label>
                                        <input type="text"  onChange={handleChange('keywords')} value={keywords}  className="form-control" placeholder="Keywords"/>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-dark">Volume</label>
                                        <input type="text" onChange={handleChange('volume')} value={volume} className="form-control" placeholder="Volume" />
                                    </div>

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

                                    <div className="row">
                                        <div className="col-md-12 mt-4">
                                            <label className="form-label text-dark">Abstract</label>
                                           
                                            <Editor
                                                apiKey="n5e3hrcymam7xktmrzizcvs3cn354e5cvutv8xbg376f8e1h"
                                                onInit={(evt, editor) => editorRef.current = editor}
                                                initialValue="<p>Write or paste abstract</p>"
                                                init={{
                                                height: 500,
                                                menubar: false,
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