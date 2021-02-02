import React from 'react';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import TransactionsPageTopPrevTable from './transactions-page-tables/transactions-page-prev-table.component';
import TransactionsPageTopCurrentTable from './transactions-page-tables/transactions-page-current-table.component';

const TransactionsPageTop = () => {
    return (
        <div className="top-components">
            <div className="top-components__container">
                <div className="current--billing__container">
                    <TransactionsPageTopCurrentTable />
                </div>
                <div className="previous--billing__container">
                    <TransactionsPageTopPrevTable />
                </div>
            </div>
        </div>
    )
};

export default TransactionsPageTop;