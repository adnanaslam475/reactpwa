import React, { Component } from 'react';
import Aux from '../../../hoc/Auxx'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    
    render() {
        const ingerdientSummary = Object.keys(this.props.ingredients)
            .map(igkey => {
                return <li key={igkey}><span>{igkey} </span>:{this.props.ingredients[igkey]} </li>
            })

        return (
            <Aux>
                {ingerdientSummary}
                <p><strong>Total Price: {this.props.price}</strong></p>
                <Button btnType='Success' clicked={this.props.continue} >continue</Button>
                <Button btnType='Danger' clicked={this.props.cancelled} >cancel</Button>
            </Aux>

        );
    }
}
export default OrderSummary