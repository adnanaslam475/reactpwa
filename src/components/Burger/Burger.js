import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import classes from './Burger.module.css'
import { withRouter } from 'react-router-dom';

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => { //igkey state ka object h
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />
            })
        }).reduce((el, err) => {
            return err.concat(el)
        }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>plaease add ingredients </p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread_top' />
            {transformedIngredients}
            <BurgerIngredients type='bread_bottom' />
        </div>
    );
}


export default withRouter(Burger)