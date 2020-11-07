import React from 'react';

import modules from './Button.module.scss'

const Button = (props) => {

    const classes = props.active ? modules.active : null;

    return (
        <button className={classes} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;