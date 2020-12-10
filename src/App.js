import React, { Component } from 'react';
import Layout from "./components/layout/Layout.js";
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/checkout/CheckOut.js';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders.js';
import Auth from './containers/Auth/Auth.js';
import Logout from './containers/Auth/logout/Logout';
import * as action from './store/actions/index'
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.onAuthTry()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/orders' component={Orders} />
        <Route exact path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path='/' component={BurgerBuilder} />
          <Route path='/checkout' component={CheckOut} />
          <Route path='/auth' component={Auth} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <div>
        pwa example
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthTry: () => dispatch(action.checkAuthState())
  }
}

const mapStateToProps = state => {
  return {
    building: state.burgerBuilder.building,
    isAuthenticated: state.auth.token !== null
  }
}

//withrouter, history k closest match k lye
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))