import React from 'react';
import './medical-scan-details.styles.scss';

import Header from '../header/header.component';
import PatientForm from '../patient-form/patient-form.component';
import MedicalScanList from './medical-scan-list/medical-scan-list.component';
import MedicalScanTable from './medical-scan-table/medical-scan-table.component';
import CustomButton from '../button/custom-button.component';

const MedicalScanDetails = () => {
    return (
        <div>
            <Header text='Medical Scan Details' />
            <div className='container'>
                <MedicalScanList />
                <MedicalScanTable />
            </div>
        </div>
    )
}

export default MedicalScanDetails;