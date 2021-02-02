import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { getAllUserAppointments } from '../../../redux/appointments/appointments.actions';

const TransactionsPageTopCurrentTable = ({ prepared_transaction_info }) => {
    const {
        appointment_id,
        name,
        age_gender,
        total_amount,
        total_discount,
        total_amount_after_discount,
        currentBalance
    } = prepared_transaction_info;

    // useEffect(() => {
    //     getAllUserAppointments()
    // }, [currentBalance]);
    console.log(
        appointment_id,
        name,
        age_gender,
        total_amount,
        total_discount,
        total_amount_after_discount,
        currentBalance
    )

    return (
        <div>
            <h2>Current Billing Status</h2>
            {
                !appointment_id
                    ? ""
                    : <div>
                        <table className='current--billing__container--table'>
                            <tbody>
                                <tr>
                                    <th>Patient Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <td>{appointment_id}</td>
                                </tr>
                                <tr>
                                    <th>Age/Gender</th>
                                    <td>{age_gender}</td>
                                </tr>
                                <tr>
                                    <th>Total Amount</th>
                                    <td>{total_amount}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{total_discount}</td>
                                </tr>
                                <tr>
                                    {/* TODO: pAID amount should come from all of preTransactions */}
                                    <th>Paid Amount</th>
                                    <td>{total_amount_after_discount - currentBalance}</td>
                                </tr>
                                <tr>
                                    {/* TODO: Balance amount should come from total_amount_after_discount minus all of preTransactions */}
                                    <th>Balance</th>
                                    <td>{currentBalance}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            }
        </div>

    )
};

const mapStateToProps = (state) => ({
    prepared_transaction_info: state.transactions.prepared_transaction_info
})

export default connect(mapStateToProps, {})(TransactionsPageTopCurrentTable);