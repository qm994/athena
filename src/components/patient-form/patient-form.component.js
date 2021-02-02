import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './patient-form.styles.scss';
import { country_list, ageTypes } from '../../static.data';

import Header from '../header/header.component';
import CustomButton from '../button/custom-button.component';
import { setCurrentPatientInfo, getCurrentPatientInfo } from '../../redux/user/user.actions';

const PatientForm = ({ setCurrentPatientInfo, getCurrentPatientInfo }) => {

    const [userInfo, setUserInfo] = useState(
        {
            prefix: '',
            name: '', gender: '',
            dob: '', age: '',
            ageType: '',
            appointmentDate: '',
            phone: '',
            address: {
                street1: '',
                street2: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            }
        }
    );

    useEffect(() => {
        setCurrentPatientInfo(userInfo);
    },[userInfo]);

    const handleChange = (e) => {
        let { value, name } = e.target;
        const isInAddressFields = Object.keys(userInfo.address).includes(name);
        if(isInAddressFields) {
            setUserInfo({
                ...userInfo,
                address: {
                    ...userInfo.address,
                    [name]: value
                }
            });
        } else if (name === 'dob') {
            const year = moment().diff(
                moment(userInfo.dob, "YYYY-MM-DD"),
                'years'
            );
            // const type = ageTypes.filter(
            //     data => data.min <= year && data.max >= year
            // )[0].category;
            setUserInfo({
                ...userInfo,
                [name]: value,
                "age": year.toString()
            });
        } else if (name === 'prefix') {
            if (value === 'mr') {
                setUserInfo({
                    ...userInfo,
                    [name]: value,
                    "gender": 'male'
                });
            } else {
                setUserInfo({
                    ...userInfo,
                    [name]: value,
                    "gender": 'female'
                });
            }
        } 
        else {
            setUserInfo({
                ...userInfo,
                [name]: value
            });
        };
    };
    return (
        <div>
            <Header text='Patient Details' />
            <div className='patient-form'>
                <div className="form__labels form__labels--col1">
                    <label htmlFor="name">Patient name</label>
                    <label htmlFor="dob">DOB</label>
                    <label htmlFor="appointment-date">Appointment Date</label>
                </div>
                <div className="form__inputs form__inputs--col1">
                    <div className='row-container'>
                        <select name="prefix" id="prefix" onChange={handleChange} required>
                            <option disabled selected value> -- select an option -- </option>
                            <option value="mr">Mr</option>
                            <option value="mrs">Mrs</option>
                            <option value="miss">Ms</option>
                        </select>
                        <input type="text" name='name' id="name" onChange={handleChange} required/>
                    </div>
                    <input type="date" name='dob' id="dob" onChange={handleChange} required/>
                    <input type="date" name='appointmentDate' id="appointmentDate" onChange={handleChange} required/>
                </div>

                <div className="form__labels form__labels--col2">
                    <label>Gender</label>
                    <label htmlFor="age">Age</label>
                    <label htmlFor="phone">Phone</label>
                </div>
                <div className="form__inputs form__inputs--col2">
                    <div className='row-container'>
                        <div>   
                            <input 
                                type="radio" 
                                name="gender" 
                                value='male'
                                onChange={handleChange} 
                                checked={userInfo.gender === 'male' ? 'checked' : null}
                            />
                            <label>Male</label>
                        </div>
                        <div>
                            <input 
                                type="radio" 
                                name="gender" 
                                value='female' 
                                onChange={handleChange}
                                checked={userInfo.gender === 'female' ? 'checked' : null}
                            />
                            <label>Female</label>
                        </div>
                    </div>
                    <div className='row-container'>
                        <input 
                            type="number" 
                            name='age' 
                            id="age" 
                            min="0" 
                            value={userInfo.age}
                            onChange={handleChange} 
                            required/>
                        <select name='ageType' id="ageType" onChange={handleChange}>
                            {
                                ageTypes.map((type, index) => (
                                    <option key={index} value={type.category}>
                                        {type.category}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <input type="text" name='phone' id="phone" onChange={handleChange} required/>
                </div>

                <div className="form__labels form__labels--col3">
                    <label htmlFor="address1">Address</label>
                </div>
                <div className="form__inputs form__inputs--col3">
                    <input type="text" id="address1" name='street1' placeholder='Street Address' onChange={handleChange} required/>
                    <input type="text" id="address2" name='street2' placeholder='Street Address 2' onChange={handleChange} />
                    <div>
                        <input type="text" id="city" name='city' placeholder='City' onChange={handleChange} required/>
                        <input type="text" id="state" name='state' placeholder='State' onChange={handleChange} required/>
                    </div>
                    <div>
                        <input type="text" id="zipcode" name='zipcode' placeholder='Postal/Zipcode' onChange={handleChange} required/>
                        <select id='country' name='country' onChange={handleChange} required>

                            {
                                country_list.map((country, index) => (
                                    <option key={index} value={country.toLowerCase()}>
                                        {country}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
};

// const mapDispatchToProps = (dispatch) => ({
//     setCurrentPatientInfo: userInfo => dispatch(setCurrentPatientInfo(userInfo))
// })

export default connect(null, { getCurrentPatientInfo, setCurrentPatientInfo })(PatientForm);