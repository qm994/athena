import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './transactions-pages-form.styles.scss';

import { saveTransaction, getPreTransactions } from '../../../redux/transactions/transactions.actions';
import {
    updateBalanceInAppointments,
    getAllUserAppointments
} from '../../../redux/appointments/appointments.actions';

const TransactionsPageBottomForm = ({
    saveTransaction,
    prepared_transaction_info,
    updateBalanceInAppointments,
    getAllUserAppointments,
    history,
    getPreTransactions }) => {

    const [currentTransaction, setCurrentTransaction] = useState({
        appointment_id: '',
        user_name: '',
        payable_amount: '',
        payment_mode: 'card',
        cardholder_name: '',
        cardholder_number: '',
        expire_date: '',
        cvs: '',
        date: ''
    });

    const getCurrentDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare transaction info
        const currentDate = getCurrentDate();
        currentTransaction.date = currentDate;
        currentTransaction.appointment_id = prepared_transaction_info.appointment_id;
        currentTransaction.user_name = prepared_transaction_info.name;
        const currentBalance = prepared_transaction_info.currentBalance
        const value = parseInt(currentTransaction.payable_amount);
        const counts = prepared_transaction_info.counts;

        // calculate new balance and validate it
        const newBalance = currentBalance - value;
        const isMeetMinimum = !currentTransaction.payable_amount ||
            value < currentBalance * 0.2;

        if (isMeetMinimum) {
            alert("Please pay at least 20% of your total amount")
        }
        else {
            // must at least 20% totalAmount (and cannot overpay)
            if (counts === 0) {
                if (newBalance < 0) {
                    alert('Sorry! We cannot process this transaction!')
                } else if (newBalance === 0) {
                    history.push('/appointments');
                };
                saveTransaction(currentTransaction);
                updateBalanceInAppointments(
                    prepared_transaction_info.appointment_id,
                    newBalance,
                    counts + 1
                );

                // must at least 20% totalAmount (and cannot overpay)
            } else if (counts === 1) {
                if (newBalance < 0) {
                    alert('Sorry! We cannot process this transaction!')
                } else if (newBalance === 0) {
                    history.push('/appointments');
                };
                saveTransaction(currentTransaction);
                updateBalanceInAppointments(
                    prepared_transaction_info.appointment_id,
                    newBalance,
                    counts + 1,
                    
                );

                // check all left balance and set the payable_amount limit
            } else {
                // TODO: means already made 2 trans, current one is third
                if (newBalance !== 0) {
                    alert('Sorry! You have to pay all rest of Balance this time!')
                } else if (counts === 3) {
                    alert('Sorry! We cannot process this transaction!')
                }
                else {
                    const new_status = 'Fully Billed';
                    saveTransaction(currentTransaction);
                    updateBalanceInAppointments(
                        prepared_transaction_info.appointment_id,
                        newBalance,
                        counts + 1,
                        new_status
                    );
                    history.push('/appointments');
                }
            }
        };
        getPreTransactions();

    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setCurrentTransaction({
            ...currentTransaction,
            [name]: value
        });
    };

    return (
        <div>
            <form className="bottom-components__form" onSubmit={handleSubmit}>
                <div className="bottom-components__form--row1">
                    <label htmlFor="payable_amount">Payable Amount:</label>
                    <input
                        type="number"
                        id='payable_amount'
                        name='payable_amount'
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="bottom-components__form--row2">
                    <label htmlFor="payment_mode">Payment Mode:</label>
                    <select type="number" id='payment_mode' name='payment_mode' onChange={onChange} required>
                        <option value="card">Card</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                {
                    currentTransaction.payment_mode === 'card'
                        ? <div>
                            <div className="bottom-components__form--row3">
                                <input
                                    type="text"
                                    id='cardholder_name'
                                    name='cardholder_name'
                                    placeholder="Cardholder's Name"
                                    onChange={onChange}
                                    required
                                />
                                <input
                                    type="number"
                                    id='cardholder_number'
                                    name='cardholder_number'
                                    placeholder="Cardholder's Number"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="bottom-components__form--row4">
                                <span>Expire</span>
                                <input type="text" id='expire_date' name='expire_date' onChange={onChange} />
                                <input type="text" id='cvs' name='cvs' onChange={onChange} />
                            </div>
                        </div>
                        : ''
                }
                <div className="bottom-components__form--row5">
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    prepared_transaction_info: state.transactions.prepared_transaction_info
})

export default withRouter(
    connect(
        mapStateToProps,
        {
            saveTransaction,
            getPreTransactions,
            updateBalanceInAppointments,
            getAllUserAppointments
        })(TransactionsPageBottomForm)
    );