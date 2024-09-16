import { Table } from "antd";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import OrdersRepository from "../../../../repositories/OrdersRepository";
import { useParams } from "react-router-dom";

export const BorrowerTable = ({ openInputFormModal, openDeleteFormModal, dataSource }) => {
  // const { order_id } = useParams(); // useParams inside the component
  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   const fetch_borrower_data = async () => {
  //     try {
  //       const response1 = await OrdersRepository.order_entry_borrower_or_seller_index({
  //         order_id: order_id,
  //         borrower_or_seller: "Borrower",
  //       });

  //       if (response1 && response1.status === "SUCCESS") {
  //         const newDataSource = (response1?.order_borrower_or_seller_index || []).map(
  //           (element, index) => ({
  //             key: index,
  //             id: element?.order_borrower_or_seller_id, // Add the unique ID
  //             borrowerName: element?.name || "",
  //             ssn: element?.ssn || "",
  //             dob: element?.dob || "",
  //           })
  //         );
  //         setDataSource(newDataSource); // Update the state with the new data
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };
  //   fetch_borrower_data();
  // }, [order_id]);

  const handleEdit = (id) => {
    openInputFormModal(id, 'Borrower');
  };

  const handleDelete = async (id) => {
    openDeleteFormModal(id, 'Borrower');    
  };

  const columns = [
    {
      title: "Borrower Name",
      dataIndex: "borrowerName",
      key: "borrowerName",
    },
    {
      title: "SSN",
      dataIndex: "ssn",
      key: "ssn",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <button
            className="btn btn-primary m-1"
            data-bs-toggle="modal"
            data-bs-original-title="Edit"
            data-bs-target="#inputFormModal"
            onClick={() => handleEdit(record.id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            className="btn btn-danger m-1"
            onClick={() => handleDelete(record.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6>Borrower List</h6>
        <button
          className="btn btn-primary m-1"
          data-bs-toggle="modal"
          data-bs-original-title="Add Borrower"
          data-bs-target="#inputFormModal"
          onClick={() => openInputFormModal("", 'Borrower')}
        >
          <i className="fa fa-plus text-white"></i>
        </button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </>
  );
};
