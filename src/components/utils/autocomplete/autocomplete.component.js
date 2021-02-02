import React, { useState } from 'react';

import './autocomplete.styles.scss';

const Autocomplete = ({ name, label, options, onChange, ...otherProps }) => { 
    return (
        options
        ? <div className='medical-detail-form-container'>
            <label htmlFor={name}>{label}</label>
            <input list={name + name} name={name} id={name} onChange={onChange} {...otherProps} />
            {
                options.length > 0 &&
                <datalist id={name + name}>
                    {
                        options.map((item, key) =>
                            <option key={key} value={item} className='option' />
                        )
                    }
                </datalist>
            }
        </div>
        : <div className='medical-detail-form-container'>
        <label htmlFor={name}>{label}</label>
        <input
            name={name}
            id={name}
            {...otherProps}
        />
        </div>
    )

};

export default Autocomplete;