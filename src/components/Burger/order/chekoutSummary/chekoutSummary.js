import * as React from 'react';
import classes from './chekoutSummary.module.css'
import Button from '../../../UI/Button/Button';
import Burger from '../../Burger'

const chekoutSummary = props => {
    return (
        <div className={classes.chekoutSummary}>
            <h1>hope its taste well</h1>
            <div style={{ width: '100%', height: '200px', alignContent: 'center' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Success' clicked={props.checkoutCancelled}>CANCEL </Button>
            <Button btnType='Danger' clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default chekoutSummary