import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/Burger/Spinner/Spinner'
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validate: {
                    required: true
                },
                valid: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onAuthRedirect()
        }
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

    swithAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    InputChangeHandler = (event, controlName) => {
        const updatedFormControls = {
            ...this.state.controls,  // this simply copy all elemnt inside control object
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.validateForm(event.target.value, this.state.controls[controlName].validate),
                touched: true
            }
        }
        this.setState({ controls: updatedFormControls })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render() {
        let formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                defaultValue={formElement.config.value}
                changed={e => this.InputChangeHandler(e, formElement.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }


        let authForm = null
        if (this.props.isAuthenticated) {
            authForm = <Redirect to={this.props.authRedirect} />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p> {this.props.error.message}</p>
            )
        }
        return (
            <div className={classes.Auth}>
                {authForm}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Danger'>SUBMIT</Button>
                </form>
                <Button btnType='Danger' clicked={this.swithAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? ' SIGN IN' : ' SIGN UP'} </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onAuthRedirect: () => dispatch(actions.authRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)