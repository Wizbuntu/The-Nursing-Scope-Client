// import uppy core 
import  Uppy from '@uppy/core'

// uppy dashboard modal
import { DashboardModal, useUppy } from '@uppy/react'

// useState 
import {useState, useEffect} from 'react'

// xhrupload
import XHRUpload from '@uppy/xhr-upload'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'


// article upload component 
const ArticleUploadWidget = (props) => {

    // init openModal state 
    const [openModal, setOpenModal] = useState(false)

   

    // init useUppy
    const uppy = useUppy(() => {
        return new Uppy({
            allowMultipleUploads: false,
            restrictions: {
                maxNumberOfFiles: 1,
                allowedFileTypes: ['.pdf', '.docx', '.doc', '.txt']
            }
        })
          .use(XHRUpload, { 
              endpoint: `${process.env.API_ROOT}/article/file/upload`,
              method: "POST",
              FormData: true,
              fieldName: 'file'
            })
      })

      

    // uppy listen on complete event
    uppy.on('complete', (result) => {
        // init imagePath 
        const filePath = result.successful[0].response.body.data.filePath
        
        // send imagePath to parent component 
        props.articleFilePath(filePath)
    })


    // init handleOpenModal 
    const handleOpenModal = () => {
        setOpenModal(true)
    }

    // init handleCloseModal 
    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <>

        <button type="button" onClick={() => handleOpenModal()} className="btn btn-outline-secondary btn-lg text-dark">Upload Article File (pdf, docx)</button>

        <DashboardModal
          uppy={uppy}
          closeModalOnClickOutside
          open={openModal}
          onRequestClose={handleCloseModal}
          
        />

        </>
    )
}




export default ArticleUploadWidget