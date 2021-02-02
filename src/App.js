import React, { Fragment, useEffect } from 'react';
import './App.scss';
import PatientInfoBill from './components/patient-info-bill/patient-info-bill.component';
import Appointments from './components/appointments/appointments.component';
import TransactionsPage from './components/transactions-page/transactions-page.component';

import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Route exact path='/' component={PatientInfoBill} />
                <Route exact path='/appointments' component={Appointments} />
                <Route exact path='/transactions' component={TransactionsPage}/>
            </Fragment>
        </BrowserRouter>
    )
};

export default App;