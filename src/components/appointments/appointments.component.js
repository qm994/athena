import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../header/header.component';
import AppointmentsTopBar from "./appointments.top.bar.component";
import AppointmentsBottomTable from "./appointments.bottom.table.component";
import { getAllUserAppointments } from '../../redux/appointments/appointments.actions';

import '../medical-scan-deatils/medical-scan-details.styles.scss';
import './appointments.styles.scss';


const Appointments = ({ history, getAllUserAppointments }) => {
    useEffect(() => {
        getAllUserAppointments()
    }, []);
    
    return (
        <div>
            <Header text='View Appointment' />
            <div class="container">
                <AppointmentsTopBar />
                <AppointmentsBottomTable />
            </div>
        </div>
    )
};

// const mapStateToProps = (state) => ({
//     all_appointments: state.appointments.all_appointments
// })

export default connect(null, { getAllUserAppointments })(Appointments);



