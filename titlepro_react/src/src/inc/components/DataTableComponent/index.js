import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactDOMServer from 'react-dom/server';

const DataTableComponent = ({ column, row_data, exportColumns = [], exportBtns = {excel:false, pdf:false}, exportTitle = "DataTable" }) => {
  const [columns, set_columns] = useState([]);
  const [data, set_data] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [filteredData, set_filteredData] = useState([]);
  const [exportDatas, setExportDatas] = useState([]);
  useEffect(() => {
    var columns1 = [];
    column.forEach(column_1 => {
      columns1.push({
        name: column_1,
        selector: row => (row[column_1]),
        sortable: true,
        allowOverflow: true,
        wrap: true,
      });
    });
    set_columns(columns1);
    
    var data1 = [];
    var exportDatas1 = [];
    row_data.forEach((item, index1) => {
      const rowData = {};
      const exportDatas2 = {};
      column.forEach((column_2, index_2) => {
        rowData[column_2] = item[index_2];
        if(exportColumns.includes(index_2)){
          if (typeof item[index_2] === 'string'){
            exportDatas2[column_2] = item[index_2];
          }else{
            var tempElement = document.createElement('div');
            tempElement.innerHTML = ReactDOMServer.renderToString(item[index_2]);
            exportDatas2[column_2] = (tempElement?.textContent || '');
          }
        }
      })
      data1.push(rowData);
      exportDatas1.push(exportDatas2);
    });
    set_data(data1);
    setExportDatas(exportDatas1);
    setFilterText('');
  }, [row_data]);

  const customStyles = {
    header: {
      style: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
    headCells: {
      style: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        borderBottom: '2px solid #ddd',
        width: 'auto',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
    rows: {
      style: {
        fontSize: '16px',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
        },
      },
    },
    cells: {
      style: {
        width: 'auto',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
      },
    },
  };

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(exportDatas);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Data");
    writeFile(workbook, `${exportTitle}.xlsx`);
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    const headCol = [];
    column.forEach((column1, index1) => {
      if(exportColumns.includes(index1)){
        headCol.push(column1);
      }
    });
    const tableRows = [];
    exportDatas.forEach(item => {
      tableRows.push(Object.values(item) || []);
    });
    doc.autoTable({
      head: [headCol],
      body: tableRows,
    });
    doc.save(`${exportTitle}.pdf`);
  };
  
  useEffect(() => {
    set_filteredData(data.filter(item => {
      const filterText1 = filterText.toLowerCase();
      var ch_filter = [];
      (Object.values(item) || []).forEach(column_1 => {
        if(column_1){
          ch_filter.push((column_1+"").toLowerCase().includes(filterText1));
        }
      });
      return ch_filter.includes(true);
    }));
  }, [data, filterText]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  return (
    <div>
      <div className="row mt-2 justify-content-between">
        <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto">
          {(exportBtns?.excel) && (<button className="btn btn-warning ms-1" onClick={exportToExcel}>
            <i className="fa fa-download"></i> Excel
          </button>)}
          {(exportBtns?.pdf) && (<button className="btn btn-danger ms-1" onClick={exportToPDF}>
            <i className="fa fa-file-pdf-o"></i> PDF
          </button>)}
        </div>
        <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-auto">
          <div className="dt-search m-1"><label>Search:</label>
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <DataTable
        className="display dataTable"
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        responsive={true}
        pagination
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationPerPage={rowsPerPage}
        onChangeRowsPerPage={(currentRowsPerPage) => setRowsPerPage(currentRowsPerPage)}
        striped
        highlightOnHover
        overflowX="scroll"
      />
    </div>
  );
};

export default DataTableComponent;
