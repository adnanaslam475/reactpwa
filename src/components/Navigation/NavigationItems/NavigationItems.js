import React from 'react';
import classes from "./NavigationItems.module.css";
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact >Burger builder</NavigationItem>
            {props.isAuth ? <NavigationItem link='/orders'>ORDERS</NavigationItem> : null}
            {!props.isAuth ? <NavigationItem link='/auth'>AUTHENTICATION</NavigationItem> :
                <NavigationItem link='/logout'>LOGOUT</NavigationItem>
            }
        </ul>
    );
};

export default NavigationItems