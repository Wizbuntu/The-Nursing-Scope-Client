// import validator 
import isEmail from 'validator/lib/isEmail';



// init validateLogin 
const validateLogin = (loginData) => {

    // validate email
    if (!(loginData.email || isEmail(loginData.email))) {
        return "please enter a valid email "
    }


    // validate password
    if (!(loginData.password)) {
        return "please enter a password"
    }

    return null
}


// validate createArticle 
const createArticle = (articleData) => {
    if (!articleData.title) {
        return "Please enter Article"
    }

    if (!articleData.author) {
        return "Please enter Author(s)"
    }

    if (!articleData.article_file_url) {
        return "Please upload article file"
    }

    if (!articleData.abstract) {
        return "Please enter or paste abstract"
    }


}

// validate addUser 
const addUser = (addUserData) => {
    if (!addUserData.firstName) {
        return "First name is required"
    }

    if (!addUserData.lastName) {
        return "Last name is required"
    }

    if (!addUserData.email) {
        return "Email address is required"
    }

    if (!isEmail(addUserData.email)) {
        return "Email address is not valid"
    }

    if (!addUserData.password) {
        return "Password is required"
    }
}


// init validations 
const validations = {
    validateLogin,
    createArticle,
    addUser
}

//export validations 
export default validations