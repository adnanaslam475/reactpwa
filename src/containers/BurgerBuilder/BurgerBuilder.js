import React, { Component } from 'react';
import Aux from '../../hoc/Auxx'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axiosInstance';
import Spinner from '../../components/Burger/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    componentDidMount() {
        this.props.onIngredientsFetched()
    }

    updatePurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }


    purchaseHandler = () => {
        this.setState({ purchasing: true })
        this.props.onAuthRedirect('/checkout')
        this.props.history.push('/auth')
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }
    render() {
        const { ingredients } = this.props
        const disabledInfo = { ...this.props.ingredients }
        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0
        }

        let orderSummary = null
        let burger = this.props.error ? <p>ingredients cant be loaded</p> : <Spinner />
        if (this.props.ingredients) {
            burger = (<Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientsAdded={this.props.mapIngredientsAdded}
                    removeIngredients={this.props.mapIngredientsRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated}
                    purchasable={this.updatePurchasable(this.props.ingredients)}
                    reset={this.resetHandler} />
            </Aux>)
            orderSummary = (<OrderSummary ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                cancelled={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />)
        }


        if (this.props.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.order.loading,
    isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => {
    return {
        mapIngredientsAdded: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
        mapIngredientsRemoved: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onIngredientsFetched: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.initPurchase()),
        onAuthRedirect: path => dispatch(burgerBuilderActions.authRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))