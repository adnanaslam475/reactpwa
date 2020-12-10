import * as React from 'react';
import classes from './order.module.css'

const order = props => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    
    const ingredientsOutput = ingredients.map(ig => {
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '5px',
            padding: '5px',
            border: '.09px solid #ccc'
        }}
            key={ig.name} >{ig.name}{': '} {ig.amount} </span>
    })
    return (
        <div className={classes.Order}>
            <p>ingredients:</p> {ingredientsOutput}
            <p>price <strong>US $:</strong>{Number.parseFloat(props.price).toFixed(2)}</p>
        </div>
    );
};

export default order