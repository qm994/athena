import React from 'react';
import { connect } from 'react-redux';

import TransactionsPageBottomForm from './transactions-pages-form/transactions-pages-form.component';
const TransactionsPageBottom = () => {
    return (
        <div className="bottom-components">
            <TransactionsPageBottomForm />
        </div>
    )
};

export default TransactionsPageBottom;