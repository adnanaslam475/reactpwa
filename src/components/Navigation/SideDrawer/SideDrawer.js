import React from 'react';
import classes from './SideDrawer.module.css'
import NavigationItems from '../NavigationItems/NavigationItems';


//side drawer responsive k lye h
const SideDrawer = props => {
    return (
        <div className={classes.SideDrawer}>
            <nav>
                <NavigationItems isAuth={props.isAuthenticated} />
            </nav>
        </div>
    );
};

export default SideDrawer