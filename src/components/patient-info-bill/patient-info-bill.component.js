import React from 'react';
import { connect } from 'react-redux';

import './patient-info-bill.styles.scss';

import PatientForm from '../patient-form/patient-form.component';
import MedicalScanDetails from '../medical-scan-deatils/medical-scan-details.component';
import CustomButton from '../button/custom-button.component';

import { addUserAppointments, getAllUserAppointments } from '../../redux/appointments/appointments.actions';

const PatientInfoBill = ({ userInfo, history, records, addUserAppointments, getAllUserAppointments }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (records.length === 0) {
            alert('Sorry! Please Select at least one test!')
        } else {
            // prepare the form data
            const totalAmount = records.reduce((acc, current) => acc + current.amount, 0);
            const totalDiscount = records.reduce((acc, current) => acc + current.discount, 0);
            const totalAmountAfterDiscount = records.reduce((acc, current) => acc + current.total, 0);

            addUserAppointments({
                userInfo, records,
                billSummary: {
                    totalAmount,
                    totalDiscount,
                    totalAmountAfterDiscount,
                    currentBalance: totalAmountAfterDiscount,
                    counts: 0
                },
                billStatus: 'Not yet Billed'
            });

            history.push('/appointments');
        }
    };

    return (
        <div>
            <form className='medical-scan-details-form' onSubmit={handleSubmit}>
                <PatientForm />
                <MedicalScanDetails />
                <CustomButton type='submit' >
                    Save
                </CustomButton>
            </form>
        </div>

    )
};

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    records: state.medicalScans.records
})

export default connect(mapStateToProps, { addUserAppointments, getAllUserAppointments })(PatientInfoBill);
