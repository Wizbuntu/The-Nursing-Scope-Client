// import Head
import Navbar from '../components/Navbar'

// import Head 
import Head from 'next/head'


// import Footer
import Footer from '../components/Footer'


// Article Component 
const Article = () => {
    return (
        <>
                <Navbar/>

                <Head>
                    <title>Articles | The Nursing Scope</title>
                </Head>

                <section className="py-0" id="home">
           

                    <div className="container">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12">
                                <div className="row align-items-center min-vh-md-75">
                                    <div className="col-md-12 col-lg-12 py-6 text-center">
                                        <h1 className="mt-6 mb-sm-4 display-4 fw-semi-bold lh-sm fs-4 fs-lg-6 fs-xxl-7">Articles</h1>
                                        <div className="pt-3">
                                            <form>
                                                <div className="input-group w-xl-75 w-xxl-50 d-flex flex-end-center search-bar">
                                                    <input className="form-control rounded-pill border-0 font-base" id="formGroupExampleInput" height="200" type="text" placeholder="Search Article" /><img className="input-box-icon me-3" src="assets/img/illustrations/search.png"
                                                        width="18" alt="" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section id="books" className="pt-0">

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 col-lg-12text-center mb-7">
                                <h1 className="fw-small-bold fs-sm-3">Search Results For - Heart</h1>
                            </div>
                            <div className="col-lg-9">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item mb-5 border border-x-0 border-bottom-0 border-200">
                                        <div className="accordion-header" id="heading1">
                                            <div className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                <div className="row w-100 justify-content-center">
                                                    <div className="col-sm-12 font-base"><span className="mb-0 fw-bold text-start fs-1 text-1200">STUDY OF THE PULMONARY HYPERTENSION AND PULMONARY VESSELS MEASUREMENTS USING COMPUTED TOMOGRAPHY</span>
                                                        <p className="my-2">Samia Abdelgaum Fathelrahman, Maha Esmeal Ahmed Esmeal</p>
                                                    </div>
                                                    <div>
                                                        <p className="fs-sm py-4">April 2021</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-5 border border-x-0 border-bottom-0 border-200">
                                        <div className="accordion-header" id="heading1">
                                            <div className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                <div className="row w-100 justify-content-center">
                                                    <div className="col-sm-12 font-base"><span className="mb-0 fw-bold text-start fs-1 text-1200">STUDY OF THE PULMONARY HYPERTENSION AND PULMONARY VESSELS MEASUREMENTS USING COMPUTED TOMOGRAPHY</span>
                                                        <p className="my-2">Samia Abdelgaum Fathelrahman, Maha Esmeal Ahmed Esmeal</p>
                                                    </div>

                                                    <div>
                                                        <p className="fs-sm py-4">April 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="accordion-item mb-5 border border-x-0 border-bottom-0 border-200">
                                        <div className="accordion-header" id="heading1">
                                            <div className="accordion-button" role="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                                <div className="row w-100 justify-content-center">
                                                    <div className="col-sm-12 font-base"><span className="mb-0 fw-bold text-start fs-1 text-1200">STUDY OF THE PULMONARY HYPERTENSION AND PULMONARY VESSELS MEASUREMENTS USING COMPUTED TOMOGRAPHY</span>
                                                        <p className="my-2">Samia Abdelgaum Fathelrahman, Maha Esmeal Ahmed Esmeal</p>
                                                    </div>

                                                    <div>
                                                        <p className="fs-sm py-4">April 2021</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-12 d-flex justify-content-center">
                                <button className="btn btn-lg btn-success rounded-pill font-base" type="submit">View More Articles </button>
                            </div>
                        </div>
                    </div>


                    </section>



                <Footer/>
        </>
    )
}




// export Article
export default Article