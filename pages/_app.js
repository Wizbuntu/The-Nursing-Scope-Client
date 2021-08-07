// loadjs
import loadjs from 'loadjs'

// useEffect
import {useEffect} from 'react'

// import next Head
import Head from 'next/head'

 
// main app component
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadjs('/vendors/@popperjs/popper.min.js', () => {
      loadjs('/vendors/bootstrap/bootstrap.min.js', () => {
          loadjs('/assets/js/theme.js', () => {
            loadjs('//widget.cloudinary.com/global/all.js')
          })
      })
  })
  }, [])

  return (
    <>
    <Head>
    <link href="/assets/css/theme.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400&amp;display=swap" rel="stylesheet"/>
    
    </Head>
    
    <Component {...pageProps} />

    </>

  )

  
}

export default MyApp
