import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
]

const BuildControls = props => {
    return(
        <div className={classes.BuildControls} >
            <p>Current price: <strong>{props.price.toFixed(2)} </strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientsAdded(ctrl.type)}
                    removed={() => props.removeIngredients(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
            )
            )}
            <span>
                <button className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered} >{!props.isAuth ? 'SIGN UP TO ORDER' : 'ORDER NOW'}</button>
            </span>
        </div>
    );
}

export default BuildControls