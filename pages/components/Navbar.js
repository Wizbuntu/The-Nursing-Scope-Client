// import useEffect
import {useEffect} from 'react'
// import Head
import Head from 'next/head'


// import Link 
import Link from 'next/link'

// import Router
import {useRouter} from 'next/router'


const Navbar = () => {

    // init router
    const router = useRouter()

    return (
        <>
        <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Home | The Nursing Scope</title>

         <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/ugonsa_logo.png" />
         <link rel="shortcut icon" type="image/x-icon" href="assets/img/ugonsa_logo.png" />
         <meta name="theme-color" content="#ffffff" />

         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />

        </Head>


        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 backdrop" data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container">
                <Link href="/"><a className="navbar-brand d-flex align-items-center fw-semi-bold fs-3"> <img className="me-3" src="/assets/img/ugonsa_logo.png" width="80" height="80" alt="" />
                </a></Link>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
                        <li className="nav-item"><Link href="/"><a className={`${router.pathname === '/' && 'active'} nav-link fw-medium`}>Home</a></Link></li>
                        
                        <li className="nav-item"><Link href="/about"><a className={`${router.pathname === '/about' && 'active'} nav-link fw-medium`}>About</a></Link></li>
                        <li className="nav-item"><Link href="/articles"><a className={`${router.pathname === '/articles' && 'active'} nav-link fw-medium`}>Articles</a></Link></li>
                        <li className="nav-item"><Link href="/members"><a className={`${router.pathname === '/members' && 'active'} nav-link fw-medium`}>Board Members</a></Link></li>

                        <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Reviews</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link href="/review-process"><a className="dropdown-item">Review Process</a></Link></li>
                                <li><Link href="/review-checklist"><a className="dropdown-item">Article Review Checklist</a></Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Publications</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link href="/guidelines"><a className="dropdown-item">Authors Guidelines</a></Link></li>
                                <li><Link href="/ethics"><a className="dropdown-item">Publication Ethics &amp; Malpractice Statement</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                   
                    <form className="ps-lg-5">
                        <Link href="/login"><a className="btn btn-lg btn-success rounded-pill bg-gradient font-base order-0">Login</a></Link>
                    </form>
                </div>
            </div>
        </nav>

        </>
    )
}


export default Navbar