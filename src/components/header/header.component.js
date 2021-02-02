import React from 'react';
import './header.styles.scss';

const Header = ({ text }) => {
    return (
        <div className='header'>
            <span>{text}</span>
        </div>
    )
};

export default Header;