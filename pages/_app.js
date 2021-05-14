// loadjs
import loadjs from 'loadjs'

// useEffect
import {useEffect} from 'react'

 
// main app component
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    loadjs('./vendors/@popperjs/popper.min.js', () => {
      loadjs('./vendors/bootstrap/bootstrap.min.js', () => {
          loadjs('./assets/js/theme.js', () => {
          })
      })
  })
  }, [])

  return <Component {...pageProps} />

  
}

export default MyApp
