
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


// useEffect and useState
import {useEffect, useState, Fragment} from 'react'

// validations 
import validations from '../../utils/validations'


// init Users component 
const Users = () => {
    // init Users state 
    const [Users, setUsers] = useState([])

    // init deleteUser state 
    const [deleteUser, setDeleteUser] = useState({
        userId: "",
        firstName: "",
        lastName: ""
    })

    // init Loading state 
    const [Loading, setLoading] = useState(false)

    // init newUser state 
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    // destructure newUser 
    const {firstName, lastName, email, password} = newUser

    // init useEffect 
    useEffect(async() => {
        const {data} = await axios.get(`${process.env.API_ROOT}/fetch/all/users`)

        // check if success
       if(data.success) {
           // update Users state 
           setUsers(data.data)

           console.log(data.data)
       }
    }, [])


    // init handleChange func 
    const handleChange = (data) => (event) => {
        // update newUser state 
        setNewUser({...newUser, [data]: event.target.value})
    }


    // init handleAddUser func 
    const handleSubmit = () => {

        // update Loading state
        setLoading(true)

        // init addUser
        const addUserData = {
            firstName, 
            lastName, 
            email, 
            password
        }

        // validate addUser
        const error = validations.addUser(addUserData)

        // check if error
        if(error) {
            //update Loading state 
            setLoading(false)

            return toast.error(error)
        }

        // axios post request to create account endpoint
        axios.post(`${process.env.API_ROOT}/create/account`, addUserData)
        .then(({data}) => {
            //update Loading state 
            setLoading(false)

            // check if not success
            if(!data.success) {
                return toast.error(data.message)
            }

            // append addUserData to Users state
            setUsers((users) => [...users, addUserData])

            return toast.success(data.message)
        })
        .catch((error) => {
            //update Loading state 
            setLoading(false)

            console.log(error)
            return toast.error("Oops! an error has occurred")
        })
        

    }

    // init handleDeleteUser
    const handleDeleteUser = (userId) => {
        if(!userId) {
            return toast.error("Oops! delete operation failed, invalid user")
        }

        // axios request to delete endpoint 
        axios.delete(`${process.env.API_ROOT}/user/delete/${userId}`)
        .then(({data}) => {
            // check if no success
            if(!data.success) {
                return toast.error(data.message)
            }

            // init filterUsers
            const filterUsers = Users.filter((user) => user.id !== userId)

            // update Users state 
            setUsers(filterUsers)

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

            <Toaster/>

            <section className="py-0 dashboard-section" id="home">
            
            {/* Users list */}
            <div className="container pt-8">
                <div className="row">
                    <div className="col-md-12 mt-6 mb-4">
                   <button data-bs-toggle="modal" data-bs-target="#addUserModal" className="btn  btn-primary article-create-btn"><i className="fa fa-plus" aria-hidden="true"></i> Add New User</button>
                    <h1 className="display-4 fw-semi-bold lh-sm fs-2 fs-lg-3 fs-xxl-4">All Users</h1>
                
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 pb-6">

                    {Users.length === 0 ? <div className="container p-5">
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
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        {Users.map((user, index) => {
                                            return <Fragment key={index}>

                                        <tbody>
                                            <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td scope="row">{user.firstName}</td>
                                            <td scope="row">{user.lastName}</td>
                                            <td scope="row">{user.email}</td>
                                            <td scope="row"><button onClick={() => setDeleteUser({...deleteUser, firstName: user.firstName, lastName: user.lastName, userId: user.id})} data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger btn-sm">Delete</button></td>
                                            </tr>
                                        </tbody>

                                            </Fragment>
                                        
                                        })}
                                    </table>
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
                                        Do you want to delete {deleteUser.lastName} {deleteUser.firstName}?
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" onClick={() => handleDeleteUser(deleteUser.userId)} data-bs-dismiss="modal" className="btn btn-danger">Yes, Delete</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Add User Modal */}
                                <div className="modal fade" id="addUserModal" tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered" >
                                        <div className="modal-content" style={{borderRadius: "0.4rem"}}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add New User</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <form>
                                            <div className="mb-3">
                                                
                                                <input type="text" value={firstName} onChange={handleChange('firstName')} className="form-control" placeholder="First name"/>
                                              
                                            </div>
                                            <div className="mb-3">
                                                
                                                <input type="text" value={lastName} onChange={handleChange('lastName')} className="form-control" placeholder="Last name"/>
                                              
                                            </div>
                                            <div className="mb-3">
                                                
                                                <input type="email" value={email} onChange={handleChange('email')} className="form-control" placeholder="Email address"/>
                                              
                                            </div>
                                            <div className="mb-3">
                                                <input type="password" value={password} onChange={handleChange('password')} className="form-control" placeholder="Password" />
                                            </div>
                                            
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" onClick={() => handleSubmit()} data-bs-dismiss="modal" className="btn btn-success">Add User</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                    }

                    
                   
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



// export Users component 
export default AuthHoc(Users)