
// import Head
import Head from 'next/head'


// import Link 
import Link from 'next/link'

// import Router
import {useRouter} from 'next/router'

// cookie js
import Cookie from 'js-cookie'



const Navbar = () => {

    // init router
    const router = useRouter()

    // init logout func 
    const logout = () => {
        // remove token from cookie
        Cookie.remove('TNS-AUTH-KEY')

        // redirect to login
        router.push('/login')
    }

    return (
        <>
        <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Dashboard | The Nursing Scope</title>

         <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/ugonsa_logo.png" />
         <link rel="shortcut icon" type="image/x-icon" href="assets/img/ugonsa_logo.png" />
         <meta name="theme-color" content="#ffffff" />
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossOrigin="anonymous" />

        </Head>


        <nav className="navbar navbar-expand-lg navbar-light fixed-top admin-nav-bg py-3 backdrop" data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container">
                <Link href="/"><a className="navbar-brand d-flex align-items-center fw-semi-bold fs-3"> <img className="me-3" src="/assets/img/ugonsa_logo.png" width="60" height="60" alt="" />
                </a></Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
                        <li className="nav-item dashboard-text"><Link href="/dashboard"><a className={`${router.pathname === '/dashboard' && 'active'} nav-link fw-medium`}><i className="fa fa-home" aria-hidden="true"></i> Dashboard</a></Link></li>
                        
                        <li className="nav-item dashboard-text"><Link href="/volume"><a className={`${router.pathname === '/volume' && 'active'} nav-link fw-medium`}><i className="fa fa-book" aria-hidden="true"></i> Volume/Issues</a></Link></li>
                       
                        <li className="nav-item dashboard-text"><Link href="/users"><a className={`${router.pathname === '/users' && 'active'} nav-link fw-medium`}><i className="fa fa-user" aria-hidden="true"></i> Users</a></Link></li>
                       

                       
                    </ul>
                    <form className="ps-lg-5">
                        <button type="button" onClick={() => logout()} className="btn btn-lg btn-success rounded-pill bg-gradient font-base order-0"><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</button>
                    </form>
                </div>
            </div>
        </nav>

        </>
    )
}


export default Navbar