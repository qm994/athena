import React from 'react';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const TransactionsPageTopPrevTable = ({
    all_previous_transactions,
    prepared_transaction_info
}) => {
    const columns = [{
        dataField: 'id',
        text: 'Sno'
    }, {
        dataField: 'date',
        text: 'Date'
    }, {
        dataField: 'payable_amount',
        text: 'Patient Amount'
    },
    {
        dataField: 'payment_mode',
        text: 'Payment Mode'
    }];

    const updatedData = !all_previous_transactions
        ? [{}]
        // filter by appointmentid and name
        : all_previous_transactions
            .map((trans) => ({
                id: trans.id,
                date: trans.date,
                payable_amount: trans.payable_amount,
                payment_mode: trans.payment_mode,
                appointment_id: trans.appointment_id
            }))
            .filter(trans => trans.appointment_id === prepared_transaction_info.appointment_id);
    return (
        <div>
            <h2>Previous Transactions</h2>
            <BootstrapTable
                keyField='id'
                data={!updatedData ? [] : updatedData}
                columns={columns}
                //selectRow={selectRow}
                bstriped
                hover
                condensed
                rowClasses="custom-row-class"
                headerClasses="custom-header-class"
                noDataIndication="No Transactions For Now!"
                pagination={paginationFactory()}
            />
        </div>
    )
};

const mapStateToProps = (state) => ({
    all_previous_transactions: state.transactions.all_previous_transactions,
    prepared_transaction_info: state.transactions.prepared_transaction_info
})

export default connect(mapStateToProps)(TransactionsPageTopPrevTable);