import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { deleteSelectedScanRecord } from '../../../redux/medical-scan/medical-scan.actions';
 
const MedicalScanTable = ({ records, deleteSelectedScanRecord }) => {

    const columns = [{
        dataField: 'sno',
        text: 'Sno'
    }, {
        dataField: 'name',
        text: 'Scan Name'
    }, {
        dataField: 'amount',
        text: 'Scan Amount'
    }, {
        dataField: 'discount',
        text: 'Scan Discount'
    }, {
        dataField: 'total',
        text: 'Total'
    }];


    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { backgroundColor: '#00b4cc' }
    };

    const updatedRecords = records.length > 0 
    ? records.map((record, idx) => ({
        ...record,
        sno: idx
    }))
    : [{
        sno: '',
        scan_name: '',
        scan_amount: '',
        scan_discount: '',
        total: ''
    }];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e.target);
            // console.log(row);
            // console.log(rowIndex);
            deleteSelectedScanRecord(rowIndex);
        }
      };

    return (
        <div className='table-components'>
            <div className='medical-detail-table'>
                {
                    records.length > 0
                    ? <BootstrapTable
                    keyField='sno'
                    data={updatedRecords}
                    columns={columns}
                    selectRow={selectRow}
                    bstriped
                    hover
                    condensed
                    rowClasses="custom-row-class"
                    headerClasses="custom-header-class"
                    rowEvents={ rowEvents }
                    pagination={ paginationFactory() }
                />
                : ''
                }
                
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    records: state.medicalScans.records
})


export default connect(mapStateToProps, { deleteSelectedScanRecord })(MedicalScanTable);