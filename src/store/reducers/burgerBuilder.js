import * as actionTypes from '../actions/actionTypes'
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const INGREDIENT_PRICE = {
    salad: 2,
    cheese: 2,
    bacon: 2.6,
    meat: 2
}


export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,  // <-- create a new ingredient state
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1//ye ingredientName hi hr jaga use hoga
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                // ...state.ingredients,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        }
        case actionTypes.SET_INGREDIENT: {
            return {
                ...state,
                // ingredients: action.ingredients,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                    cheese: action.ingredients.cheese,
                },
                error: false,
                building: false
            }
        }
        case actionTypes.FAILED_INGREDIENT: {
            return {
                error: true
            }
        }
        default: {
            return state
        }
    }
}