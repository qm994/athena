import React, { Children } from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, ...props }) => {
    // children here represnt every between the open and closing brackets. for here is: `sign in`
    return (
        <button className='custom-button' {...props}>
             {children}
        </button>
    )
}

export default CustomButton;