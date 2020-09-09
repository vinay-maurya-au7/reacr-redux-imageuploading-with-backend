import axios from 'axios'
import setAuthToken from '../helper/setAuthToken'
import jwt_decode from 'jwt-decode'


export const userLoginHelper = (data) => {
    return {
        type: "SET_USERS_DATA",
        payload: data
    }
}

const userLogoutHelper = (data) => {
    return {
        type: "DELETE_USERS_DATA",
        payload: data
    }
}

const getAllPostHelper = (data) => {
    return {
        type: "ALL_POSTS",
        payload: data
    }
}

const usersPostHelper = (data) => {
    return {
        type: "USERS_POST",
        payload: data
    }
}


export const userRegister = (userRegisterCredentials,history) => {
    return async () => {
        try {
            const { data } = await axios({
                method: "Post",
                url: "http://localhost:5000/api/user/register",
                data: userRegisterCredentials
            })
            history.push('/')
        }
        catch (err) {
            console.log("Error in userRegister Action", err.message)
        }
       
    }
}

export const userLogin = (userLoginCredentials,history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Post",
                url: "http://localhost:5000/api/user/login",
                data: userLoginCredentials
            })
            
            const { token } = data

            localStorage.setItem('userJwtToken', token);
            
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(userLoginHelper(decoded.user))
            history.push('/allposts')
        }
        catch (err) {
            console.log("Error in userLogin Action", err.message)
        }

    }
}

export const userUploadPost = (userPostCredential, history) => {
    return async () => {
        try {
            const { data } = await axios({
                method: "Post",
                url: "http://localhost:5000/api/user/uploadPost",
                data: userPostCredential
            })
            console.log(data.message)
            alert("Post uploaded successfully")
            history.push('/allPosts')
        }
        catch (err) {
            console.log("Error in userUploadPost", err.message)
        }
    }
}

export const getAllPost = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: "http://localhost:5000/api/user/getAllPost"
            })
            dispatch(getAllPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const getUsersPost = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "Get",
                url: "http://localhost:5000/api/user/usersPost"
            })
            dispatch(usersPostHelper(data.message))
        }
        catch (err) {
            console.log("Error in getting all Post", err.message)
        }
    }
}

export const userLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('userJwtToken');
        setAuthToken(false);
        dispatch(userLogoutHelper({}));
    }
}