import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authRedirect = path => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}


export const logout = () => {
    localStorage.clear()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}
export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZhw--QkCDWKw4OF4N12b8OY5i3suUjaM'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZhw--QkCDWKw4OF4N12b8OY5i3suUjaM'
        }
        axios.post(url, data)
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationTime', expirationTime)
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId)) // res.data object k andar hota ata h sb kuch
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error)) //iska responsse alag ata h
            })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationTime = new Date(localStorage.getItem('expirationTime')) //new date, date k format ma lane k lye
            if (expirationTime <= new Date()) {
                dispatch(logout())
            }
            else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}