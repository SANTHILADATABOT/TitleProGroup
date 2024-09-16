import { useEffect } from "react";
import $ from 'jquery';
import 'datatables.net-bs5';

const TableTreeView = ({ column, row_data }) => {

    return (
        <>
        <div className="table-responsive">
            <table className="display w-100" id="menu_perm_tb">
                <tr>
                    {column.map((column1, index) => (
                        <th key={index}>{column1}</th>
                    ))}
                </tr>
                {row_data.map((row_data1, rowIndex) => {
                    return (row_data1);
                })}
            </table>
        </div>
        <div
        dangerouslySetInnerHTML={{
          __html: `
            <script>
                $(document).ready(function() {
                    $('#menu_perm_tb').simpleTreeTable({
                        opened: []
                    });
                });
            </script>
          `,
        }}
      />
        </>
    );
};

export default TableTreeView;
