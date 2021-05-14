// import Head
import Navbar from './components/Navbar'

// import Head 
import Head from 'next/head'

// import Footer
import Footer from './components/Footer'



// Review Process Component 
const ReviewProcess = () => {
    return (
        <>
             <Navbar/>

            <Head>
                <title>Review Process | The Nursing Scope</title>
            </Head>


<section className="py-5" id="home">

        <div className="container">
            <div className="row align-items-center min-vh-md-75">
                <div className="col-md-12">
                <section id="libraries">
                
                    <div className="container">
                        <div className="row g-xl-0 align-items-center">

                            <div className="col-md-12 col-lg-12 text-md-start offset-lg-1 offset-xxl-0">
                                <h1 className="fw-semi-bold text-success">Review <span className="text-black">Process</span></h1>
                                <p className="pt-3 lh-lg">The Nursing Scope shall not accept or publish manuscripts without prior peer- review. There
                                    shall be a review process of manuscripts by two or more reviewers who are experts in the
                                    pertinent subject area.</p>

                                <p className="pt-3 lh-lg">Authors should strive for maximum clarity of expression, bearing in mind that the purpose of the
                                        publication is the disclosure of scientific knowledge. Material that is not essential to the
                                        continuity of the text (e.g., proofs, derivations, or calculations) shall be placed in Appendices</p>


                                <p className="pt-3 lh-lg">Editor-In-Chief evaluates the plagiarism originality index result of the paper and the
                                    recommendation(s) of the Editors and Reviewers and notifies author about the manuscript status.
                                    The manuscript may be accepted for publication as follows:</p>


                                <ul>
                                    <li>As it is without changes</li>
                                    <li>With minor changes, or minor review</li>
                                    <li>After major revision and additional review</li>
                                    <li>Rejected</li>
                                </ul>


                                <p className="pt-3 lh-lg">The comments of the anonymous reviewers shall be forwarded to the author(s), and when the
                                        author(s) is/are ready to submit their revised manuscript(s), the author(s) shall be required to
                                        disclose the modifications that have been made in the manuscript(s) and if without changes -
                                        why the suggested change(s) was/were not made.</p>


                                <p className="pt-3 lh-lg">Material that has been previously copyrighted, published, or accepted for publication will not be
                                    considered for publication in The Nursing Scope.</p>


                                <p className="pt-3 lh-lg">The review process shall ensure that if more than one author participated in the manuscript, they
                                        shall all have equal opportunity for publication of their paper. Acceptance and scheduling of
                                        publication shall be coordinated by the Editor-in-Chief in collaboration with UGONSA National
                                        Secretary.</p>


                                <p className="pt-3 lh-lg">The Editorial Board Members and the Reviewers are highly committed to a quick review process
                                        of papers, but not with the sacrifice to the right judgment. The review process shall be as short as
                                        possible but in accordance with the specific demands of a paper.</p>
                               
                            </div>
                        </div>

                        <div className="row g-xl-0 align-items-center mt-5">

                            <img src="/assets/img/illustrations/review.png" className="img-fluid"></img>
                           
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



// export Review Process Component 
export default ReviewProcess