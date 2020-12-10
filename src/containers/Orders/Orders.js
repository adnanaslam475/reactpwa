import React, { Component } from 'react';
import Order from '../../components/Burger/order/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosInstance';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index'
import Spinner from '../../components/Burger/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder(this.props.token, this.props.userId, this.props.msg)
    }

    render() {
        let ordersRender = <Spinner />
        if (!this.props.loading) {
            ordersRender = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        return (
            <div>
                {ordersRender}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        msg: state.order.msg,
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId, msg) => dispatch(action.fetchOrders(token, userId, msg))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))