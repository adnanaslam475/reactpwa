import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionTypes.AUTH_REDIRECT:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default: return state
    }
}
export default reducer