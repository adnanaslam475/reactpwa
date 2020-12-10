import * as actionTypes from './actionTypes'
import axios from '../../axiosInstance'

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients //jo firebase ma name save h woi hona chye 'ingredients'
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FAILED_INGREDIENT,
    }
}
export const setAuthRedirect = path => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerapp123.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            })
    }
}