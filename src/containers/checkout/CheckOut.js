import React from 'react';
import ChekoutSummary from '../../components/Burger/order/chekoutSummary/chekoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../contactData/contactData';
import { connect } from 'react-redux';

const checkOut = props => {
    const checkoutCancelHandler = () => {
        props.history.goBack()
    }
    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to='/' />
    let purchasedCompleted = props.purchased ? <Redirect to='/' /> : null
    if (props.ingredients) {
        summary = <div >
            {purchasedCompleted}
            <ChekoutSummary ingredients={props.ingredients}
                checkoutContinue={checkoutContinueHandler}
                checkoutCancelled={checkoutCancelHandler} />
            <Route path={props.match.path + '/contact-data'}
                //  ye bhi hoskta h-> </Route> render={props => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />}
                component={ContactData} />
        </div>
    }
    return summary
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
})



export default connect(mapStateToProps)(checkOut)