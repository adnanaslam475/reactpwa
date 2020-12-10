import * as React from 'react';
import classes from "./Input.module.css";

const Input = props => {
    let InputElement = false
    switch (props.elementType) {
        case ('input'):
            InputElement = <input
                className={classes.InputElement}
                onChange={props.changed}
                {...props.elementConfig} //is ma type or placeholder ara h contact data se
                required 
                value={props.value} />
            break
        case ('textarea'):
            InputElement = <textarea
                className={classes.Textarea}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break
        case ('select'):
            InputElement = (
                <select className={classes.InputElement}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    })}
                </select>
            )
            break
        default:
            InputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
    }
    return (
        <div className={classes.Input}>
            {InputElement}
        </div>
    );
}
export default Input