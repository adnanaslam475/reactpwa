import React, { Component } from 'react';
import classes from './contactData.module.css'
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/Burger/Spinner/Spinner'
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosInstance'
import * as action from '../../store/actions/index'

class contactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validate: {
                    required: true,
                    minLength: 3,
                },
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validate: {
                    required: true
                },
                valid: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address'
                },
                value: '',
                validate: {
                    required: true
                },
                valid: false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validate: {
                    required: true
                },
                value: ''
            }
        },
        loading: false,
    }

    validateForm(value, rules) {
        let isValid = false
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength
        }
        return isValid
    }

    orderHandler = e => {
        e.preventDefault()
        const formData = {}
        for (let inputElementIdentifier in this.state.orderForm) {
            formData[inputElementIdentifier] = this.state.orderForm[inputElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(this.props.token, order)
    }



    handleChange = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //ye ak se zyada input k lye h
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] //input identifier name, email, street h
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.validateForm(updatedFormElement.value, updatedFormElement.validate)
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({ orderForm: updatedOrderForm })
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler} >
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        defaultValue={formElement.config.value}
                        changed={e => this.handleChange(e, formElement.id)}
                    />
                ))}
                <Button btnType='Danger'>ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4 className={classes.Input}>Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => {
    return { //parameter ma ordering same honi chye 
        onOrderBurger: (token, orderData) => dispatch(action.purchaseBurger(token, orderData))
    }
}

//order button se main page pr jane k lye withrouter , ya phr{...props }  lgana jhn contactData render h
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios))