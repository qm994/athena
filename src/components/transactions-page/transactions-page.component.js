import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import Header from '../header/header.component'
import TransactionsPageTop from './transactions.top.component';
import TransactionsPageBottom from './transactions.bottom.component';
import { getPreTransactions } from '../../redux/transactions/transactions.actions';
import { getAllUserAppointments } from '../../redux/appointments/appointments.actions';
//import '../medical-scan-deatils/medical-scan-details.styles.scss';
import './transactions-page.component.styles.scss';

const TransactionsPage = ({ getPreTransactions }) => {
    useEffect(() => {
        getPreTransactions()
    }, [])
    return (
        <div>
            <Header text='Patient Billing' />
            <div className='transactions__container'>
                <TransactionsPageTop />
                <TransactionsPageBottom />
            </div>
        </div>
    )
};

export default connect(null, { getPreTransactions })(TransactionsPage);