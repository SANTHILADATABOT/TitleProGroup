import { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net-bs5';
import { Checkbox } from "antd";
import { ToastContainer, toast } from "react-toastify";
const DataTable = ({ column, row_data,}) => {
  useEffect(() => {
    $(".output_table").DataTable();
  }, []);



  return (
    <div className="table-responsive">
      <table className="display output_table">
        <thead>
          <tr>
            {column.map((column1, index) => (
              <th key={index}>{column1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {row_data.map((row_data1, rowIndex) => {
            return row_data1;
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default DataTable;
