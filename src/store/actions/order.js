import * as actionTypes from './actionTypes'
import axios from '../../axiosInstance'


export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchaseBurgerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

//ye loading spinner k lye h 
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}
// srf ye h async action creator
export const purchaseBurger = (token, orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data, orderData))
                // this.props.history.push('/')  //ya phr purhseburgrstrt
            }
            ).catch(err => {
                dispatch(purchaseBurgerFailed(err))
            })
    }
}

//ye loading spinner k lye h
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrdersArray = []
                for (let key in res.data) {
                    fetchedOrdersArray.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrdersArray))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            })
    }
}