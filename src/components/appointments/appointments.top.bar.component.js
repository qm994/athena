import React, { useState } from 'react';
import { connect } from 'react-redux';

import { setFilterInfo } from '../../redux/filter-info/filter-info.actions';

import { setFilteredAppointments } from '../../redux/appointments/appointments.actions';

const AppointmentsTopBar = ({ setFilterInfo }) => {

    const [searchInfo, setSearchInfo] = useState({
        from_date: "",
        to_date: "",
        status: "",
        search_text: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchInfo({
            ...searchInfo,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // firstly update the filterInfo
        setFilterInfo(searchInfo);
        // secondly update the table with filters
        //setFilteredAppointments()
    };
    
    return (
        <form className='scan-components appointment-table' onSubmit={handleSubmit}>
            <div className='medical-detail-form appointment-table-form'>
                <div className='medical-detail-form-container appointment-table-container'>
                    <label htmlFor="from_date">From Date</label>
                    <input
                        type="date"
                        name="from_date"
                        id="from_date"
                        className="appointment-table__input"
                        onChange={handleChange}
                    />
                </div>
                <div className='medical-detail-form-container appointment-table-container'>
                    <label htmlFor="to_date">To Date</label>
                    <input
                        type="date"
                        name="to_date"
                        id="to_date"
                        className="appointment-table__input"
                        onChange={handleChange}
                    />
                </div>
                <div className='medical-detail-form-container appointment-table-container'>
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" onChange={handleChange}>
                        <option value="Not yet Billed">Not yet Billed</option>
                        <option value="Due Billed ">Due Billed </option>
                        <option value="Fully Billed">Fully Billed</option>
                    </select>
                </div>
                <div className='medical-detail-form-container appointment-table-container'>
                    <label htmlFor="search-text">Common Search</label>
                    <input
                        type="text"
                        name="search_text"
                        id="search_text"
                        className="appointment-table__input"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button 
                        type='submit' 
                        className="appointment-table__button" 
                        onSubmit={handleSubmit}
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
};

export default connect(null, { setFilterInfo, setFilteredAppointments })(AppointmentsTopBar);