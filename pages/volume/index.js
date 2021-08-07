
// adminNav
import AdminNav from '../components/adminNav'

// footer 
import Footer from '../components/Footer'

// axios 
import axios from '../../utils/axiosConfig'

// import AuthHoc 
import AuthHoc from '../../Hoc/authHoc'

// react hot toast
import toast, { Toaster } from 'react-hot-toast';

// Head
import Head from 'next/head'

// useEffect and useState
import {useEffect, useState, Fragment} from 'react'

// validations 
import validations from '../../utils/validations'

// useRouter
import {useRouter} from 'next/router'


// Date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// date-fns
import {format} from 'date-fns'






// init Volume component 
const Volume = () => {
    // init useRouter
    const router = useRouter()


    // init Volumes state 
    const [Volumes, setVolumes] = useState([])

    // init deleteVolume state 
    const [deleteVolume, setDeleteVolume] = useState({
        volumeId: "",
        volume: "",
        issue: ""
    })

    // init Loading state 
    const [Loading, setLoading] = useState(false)

    // init newVolume state 
    const [newVolume, setNewVolume] = useState({
        volume: "",
        issue: "",
    })

    // init volumeDate state 
    const [volumeDate, setVolumeDate] = useState(new Date())

    // destructure newUser 
    const {volume, issue} = newVolume

    // init useEffect 
    useEffect(async() => {
        const {data} = await axios.get(`${process.env.API_ROOT}/volumes`)

        // check if success
       if(data.success) {

           // update volumes state 
           setVolumes(data.data)

           console.log(data.data)
       }
    }, [])

   


    // init handleChange func 
    const handleChange = (data) => (event) => {
        // update newUser state 
        setNewVolume({...newVolume, [data]: event.target.value})
    }


    // init handleSubmit func 
    const handleSubmit = () => {

        // update Loading state
        setLoading(true)


        // init addVolumeData
        const addVolumeData = {
            volume:`volume ${Number(volume)}`,
            issue: `issue ${Number(issue)}`,
            date: format(volumeDate, 'MMMM yyyy')
        }

        // validate addUser
        const error = validations.addVolume(addVolumeData)

        // check if error
        if(error) {
            //update Loading state 
            setLoading(false)

            return toast.error(error)
        }


        // axios post request to create account endpoint
        axios.post(`${process.env.API_ROOT}/volumes`, addVolumeData)
        .then(({data}) => {
            //update Loading state 
            setLoading(false)

            // check if not success
            if(!data.success) {
                return toast.error(data.message)
            }

            //success toast
            toast.success(data.message)

            //reload page
            router.reload()
        })
        .catch((error) => {
            //update Loading state 
            setLoading(false)

            console.log(error)
            return toast.error("Oops! an error has occurred")
        })
        
    }

    // init handleDeleteVolume
    const handleDeleteVolume = (volumeId) => {
        if(!volumeId) {
            return toast.error("Oops! delete operation failed, invalid volume")
        }

        console.log(volumeId)

        // axios request to delete endpoint 
        axios.delete(`${process.env.API_ROOT}/volume/${volumeId}`)
        .then(({data}) => {
            // check if no success
            if(!data.success) {
                return toast.error(data.message)
            }

            // init filterVolumes
            const filterVolumes = Volumes.filter((vol) => vol.id !== volumeId)

            // update Users state 
            setVolumes(filterVolumes)

            return toast.success(data.message)
        })
        .catch((error) => {
            console.log(error)
            return toast.error("Oops! an error has occured")
        })
    }

    return (
        <Fragment>

            <AdminNav/>

            <Head>
                <title>Volumes/Issues | The Nursing Scope</title>
            </Head>

            <Toaster/>

            <section className="py-0 dashboard-section" id="home">

            
           
            
            {/* Volumes list */}
            <div className="container pt-8">
                <div className="row">
                    <div className="col-md-12 mt-6 mb-4">
                   <button className="btn  btn-primary article-create-btn" data-bs-toggle="modal" data-bs-target="#addVolumeModal"><i className="fa fa-plus"></i> Create Volume/Issues</button>
                    <h1 className="display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4">All Volume/Issues</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 pb-6">

                    {Volumes.length === 0 ? <div className="container p-5">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-md-8 mt-5">
                                    <h1 className="text-center text-muted display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4">Result Empty</h1>
                            </div>
                            <div className="col"></div>
                        </div>
                        
                    </div> : 
                    <>
                        <div className="row">
                        

                            <div className="col-lg-12 col-md-12 col-sm-12 mt-4">
                                <div className="card table-card">
                                    <div className="card-body p-3 table-responsive">
                                    <table className="table table-borderless text-center">
                                        <thead>
                                            <tr>
                                            <th scope="col">S/N</th>
                                            <th scope="col">Volume</th>
                                            <th scope="col">Issue</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {Volumes.map((volume, index) => {
                                            return <Fragment key={index}>

                                        <tbody>
                                            <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td scope="row">{volume.volume}</td>
                                            <td scope="row">{volume.issue}</td>
                                            <td scope="row">{volume.date}</td>
                                            <td scope="row"><button onClick={() => setDeleteVolume({...deleteVolume, volume: volume.volume, issue: volume.issue, volumeId: volume.id})} data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger btn-sm" type="button">Delete</button></td>
                                            </tr>
                                        </tbody>

                                            </Fragment>
                                        
                                        })}
                                    </table>
                                    </div>
                                </div>
  
                            </div>
                        </div>

                        {/* Delete User Modal */}
                     <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" >
                                   
                            <div className="modal-content" style={{borderRadius: "0.4rem"}}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Delete User</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Do you want to delete <b>{deleteVolume.volume} {deleteVolume.issue}</b>?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={() => handleDeleteVolume(deleteVolume.volumeId)} data-bs-dismiss="modal" className="btn btn-danger">Yes, Delete</button>
                                </div>
                            </div>
                        </div>
                                    
                    </div>

                    </>
                    }
                     


                    {/* Add Volume/Issue Modal */}
                    <div className="modal fade" id="addVolumeModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" >
                                   
                            <div className="modal-content" style={{borderRadius: "0.4rem"}}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add New Volume/Issue</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label>Volume Number</label>
                                            <input type="number"  onChange={handleChange('volume')} className="form-control" placeholder="Enter Volume Number"/>
                                              
                                            </div>
                                            <div className="mb-3">
                                                <label>Issue Number</label>
                                                <input type="text" onChange={handleChange('issue')} className="form-control" placeholder="Enter Issue Number"/>
                                              
                                        </div>
                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label style={{display: 'block'}}>Select Date (Month/Year)</label>
                                                    <DatePicker
                                                        className="form-control"
                                                        selected={volumeDate}
                                                        placeholderText="Select Date"
                                                        onChange={date => setVolumeDate(date)}
                                                        dateFormat="MM/yyyy"
                                                        showMonthYearPicker
                                                        />
                                                    </div>
                                                </div>
                                           
                                              
                                        </div>
                                           
                                            
                                    </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" onClick={() => handleSubmit()} data-bs-dismiss="modal" className="btn btn-success">Add Volume/Issue</button>
                                    </div>
                            </div>
                        </div>
                                   
                    </div>
                   
                    </div>
                </div>
                <div className="row pt-7 mb-6">
                    
                </div>
                
            </div>

            <Footer/>
        </section>

        </Fragment>
    )
}



// export Volume component 
export default AuthHoc(Volume)