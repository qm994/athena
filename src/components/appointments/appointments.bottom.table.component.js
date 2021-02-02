import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { prepareTransactionInfo } from '../../redux/transactions/transactions.actions';

const AppointmentsBottomTable = ({ history, all_appointments, filterInfo, prepareTransactionInfo }) => {

    const columns = [{
        dataField: 'id',
        text: 'Sno'
    }, {
        dataField: 'name',
        text: 'Patient Name'
    }, {
        dataField: 'age_gender',
        text: 'Age-Gender'
    }, {
        dataField: 'appointmentDate',
        text: 'Appointment Date'
    }, {
        dataField: 'balance',
        text: 'Balance Amount'
    }, {
        dataField: 'billStatus',
        text: 'Action'
    }];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            prepareTransactionInfo(row.id);
        }
    };

    const transformAppointments = (all_appointments, filterInfo) => {
        const filteredData = getFilterdData(filterInfo, all_appointments);
        console.log(filteredData)
        if (filteredData) {
            return filteredData.map((appointment) => ({
                id: appointment.id,
                name: appointment.userInfo.name,
                age_gender: appointment.userInfo.age.concat('-', appointment.userInfo.gender),
                appointmentDate: appointment.userInfo.appointmentDate,
                // TODO: need to minus pre transactions
                balance: appointment.billSummary.currentBalance,
                billStatus: appointment.billStatus === 'Fully Billed'
                    ? appointment.billStatus
                    : <Link to='/transactions'>Click To Pay</Link>
            }))
        } else {
            return [{}]
        }
    };


    const matches = (text, key, fieldObject, isDate) => {
        if (isDate) {
            // compare dates 
            const [from_date, to_date] = key;
            if (!(from_date in fieldObject) && !(to_date in fieldObject)) {
                return true
            } else if (!(from_date in fieldObject) && to_date in fieldObject) {
                return Date.parse(text) <= Date.parse(fieldObject[to_date])
            } else if (from_date in fieldObject && !(to_date in fieldObject)) {
                return Date.parse(text) >= Date.parse(fieldObject[from_date])
            } else {
                return Date.parse(text) >= Date.parse(fieldObject[from_date]) &&
                    Date.parse(text) <= Date.parse(fieldObject[to_date])
            }

        }
        // else if(key='status') {
        //     if (fieldObject.key === '')
        // } 
        else {
            if (!(key in fieldObject)) {
                return true
            } else {
                return text.toLowerCase().indexOf(fieldObject[key].toLowerCase()) > -1;
            }
        }
    }

    const getFilterdData = (filterInfo, appointments) => {
        let nonEmptyFields = Object.entries(filterInfo).filter(field => field[1] !== "");
        if (nonEmptyFields.length === 0) {
            return appointments
        } else {
            nonEmptyFields = Object.fromEntries(nonEmptyFields);
            const data =  appointments.filter((appointment) => 
                matches(appointment.userInfo.name, "search_text", nonEmptyFields, false)
                &&
                matches(
                    appointment.userInfo.appointmentDate,
                    ["from_date", "to_date"],
                    nonEmptyFields,
                    true
                )
                ||
                // TODO
                matches(appointment.billStatus, "status", nonEmptyFields, false)
            );
            return data
        }
    };

    return (
        <div className='table-components appointment-table'>
            <div className='medical-detail-table'>
                {
                    all_appointments
                        ? <BootstrapTable
                            keyField='id'
                            data={transformAppointments(all_appointments, filterInfo)}
                            columns={columns}
                            //selectRow={selectRow}
                            bstriped
                            hover
                            condensed
                            rowClasses="custom-row-class"
                            headerClasses="custom-header-class"
                            rowEvents={ rowEvents }
                            pagination={paginationFactory()}
                        />
                        : <h2>No Appointments Yet!</h2>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    all_appointments: state.appointments.all_appointments,
    filterInfo: state.filterInfo
})

export default connect(mapStateToProps, { prepareTransactionInfo })(AppointmentsBottomTable);