// import Head
import Navbar from './components/Navbar'

// import Head 
import Head from 'next/head'

// import Footer
import Footer from './components/Footer'



// About component 
const  About  = () => {
    return (
        <>

            <Navbar/>

            <Head>
                <title>About | The Nursing Scope</title>
            </Head>


            <section className="py-5" id="home">
        
                    <div className="container">
                        <div className="row align-items-center min-vh-md-75">
                            <div className="col-md-12">
                            <section id="libraries">
                            
                                <div className="container">
                                    <div className="row g-xl-0 align-items-center">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fw-semi-bold text-success">About <span className="text-black">Journal</span></h1>
                                            <p className="pt-3 lh-lg">The Nursing Scope is a peer-reviewed international journal of the University Graduates of Nursing Science Association (UGONSA) concerned with all aspects of Nursing and other health-related professions.</p>
                                           
                                        </div>
                                    </div>

                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Our <span className="text-black">Mission</span></h1>
                                            <p className="pt-3 lh-lg">The mission of the journal is to promote knowledge-based healthcare delivery through global spreading of science-based knowledge in nursing, allied health sciences, medicine, and any field that deals with human health.</p>
                                           
                                        </div>
                                    </div>


                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Our <span className="text-black">Goal</span></h1>
                                            <p className="pt-3 lh-lg">The main purpose of The Nursing Scope is to disseminate science-based knowledge
                                                    globally in nursing, allied health sciences, medicine, and any field that deals with human health
                                                    through the publication of original papers.</p>
                                        
                                        </div>
                                    </div>


                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Our <span className="text-black">Contributors</span></h1>
                                            <p className="pt-3 lh-lg">The Nursing Scope publishes original articles, reports, reviews, clinical reports
                                                    and commentaries from researchers, scholars, individuals and professional bodies in nursing
                                                    science, allied health sciences, medicine and any field that deals with human health.</p>
                                        
                                        </div>
                                    </div>


                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Our <span className="text-black">Distributions</span></h1>
                                            <p className="pt-3 lh-lg">Articles on the UGONSA website of the journal are open to the world. The hard
                                                                copy is part of the UGONSA Professional Conference materials. It is also available for a fee.</p>
                                        
                                        </div>
                                    </div>


                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Our <span className="text-black">History</span></h1>
                                            <p className="pt-3 lh-lg">The Nursing Scope history is almost as old as and as chequered as that of UGONSA. The first three volumes were respectively published in the year 1989, 1990 and 1991. The association was known as the Graduate Nurses Association of Nigeria (GNAN). The continuation of the series from where it stopped is in view in the year 2021 with Volume four (4) which is poised to take off with the 20 th  Professional Conference. <b>(Read more about the history of UGONSA on the history column of the website).</b></p>
                                        
                                        </div>
                                    </div>



                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success">Issues' <span className="text-black">Target</span></h1>
                                            <p className="pt-3 lh-lg">For the year 2021, the association is poised to publish one Issue as Volume 4 during its 20 th  Professional Conference. From the year 2022 onward, it targets three issues annually.</p>
                                        
                                        </div>
                                    </div>

                                    <div className="row g-xl-0 align-items-center mt-5">
            
                                        <div className="col-md-12 col-lg-12  text-md-start offset-lg-1 offset-xxl-0">
                                            <h1 className="fs-3 text-success"><span className="text-black">ISSN</span></h1>
                                            <p className="pt-3 lh-lg">ISSN:  <b>0795 – 6541 (Print).</b> The e-ISSN will be available in no distant time.</p>
                                        
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


//export about component 
export default About