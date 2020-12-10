import React from 'react';
import classes from "./Backdrop.module.css";

const Backdrop = props => (
    //network error k peche black screen ati h
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

)

export default Backdrop