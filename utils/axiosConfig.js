// import axios 
import axios from 'axios'

// import Cookie 
import Cookie from 'js-cookie'


// configure axios 
axios.interceptors.request.use((config) => {

    // get token
    const token = Cookie.get('TNS-AUTH-KEY')

    // check if token 
    if (token) {
        // add token to authorization header
        config.headers.authorization = token
    }

    return config

})



// export axios 
export default axios