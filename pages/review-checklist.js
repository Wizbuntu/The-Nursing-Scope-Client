// import Head
import Navbar from './components/Navbar'

// import Head 
import Head from 'next/head'

// import Footer
import Footer from './components/Footer'


// Review Checklist component 
const ReviewChecklist = () => {
    return (
        <>

            <Navbar/>

            <Head>
                <title>Review Checklist | The Nursing Scope</title>
            </Head>


            <section className="py-5" id="home">

                <div className="container">
                    <div className="row align-items-center min-vh-md-75">
                        <div className="col-md-12">
                        <section id="libraries">
                        
                            <div className="container">
                                <div className="row g-xl-0 align-items-center">

                                    <div className="col-md-12 col-lg-12 text-md-start offset-lg-1 offset-xxl-0">
                                        <h1 className="fw-semi-bold text-success">Review <span className="text-black">Checklist</span></h1>
                                        <p className="pt-3 lh-lg">The Article Review Checklist provides questions to guide the Reviewers in assessment of papers submitted to The Nursing Scope.</p>

                                        <p className="pt-3 lh-lg">Click the download button below to download the current Article Review Checklist</p>

                                        <a href="https://drive.google.com/file/d/13oy482qICYie1qVi_LotOObWjiOLILGC/view?usp=sharing" target="_blank" className="btn btn-success">Download</a>

                                    </div>
                                </div>
                            
                            </div>
                        </section>
                        </div>
                    </div>
                </div>
            </section>





            <Footer/>


        </>
    )
}



// export 
export default ReviewChecklist