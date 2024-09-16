import { Table } from "antd";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
// import OrdersRepository from "../../../repositories/OrdersRepository";
import { useParams } from "react-router-dom";

export const SellerTable = ({ openInputFormModal, openDeleteFormModal, dataSource}) => {
  // const { order_id } = useParams(); // useParams inside the component
  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   const fetch_seller_data = async () => {
  //     try {
  //       const response1 = await OrdersRepository.order_entry_borrower_or_seller_index({
  //         order_id: order_id,
  //         borrower_or_seller: "Seller",
  //       });

  //       if (response1 && response1.status === "SUCCESS") {
  //         const newDataSource = (response1?.order_borrower_or_seller_index || []).map(
  //           (element, index) => ({
  //             key: index,
  //             id: element?.order_borrower_or_seller_id, // Add the unique ID
  //             borrowerName: element?.name || "", // Assuming 'name' is the seller's name
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
  //   fetch_seller_data();
  // }, [order_id]);

  const columnsSeller = [
    {
      title: "Seller Name",
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
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <>
    //       <button
    //         className="btn btn-primary m-1"
    //         data-bs-toggle="modal"
    //         data-bs-original-title="Edit"
    //         data-bs-target="#inputFormModal"
    //         onClick={() => openInputFormModal(record.id, 'Seller')} // Pass the ID and role
    //       >
    //         <i className="fa fa-edit"></i>
    //       </button>
    //       <button
    //         className="btn btn-danger m-1"
    //         onClick={() => handleDelete(record.id)} // Implement handleDelete if needed
    //       >
    //         <i className="fa fa-trash"></i>
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const handleDelete = async (id) => {
    openDeleteFormModal(id, 'Seller');    
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h6>Seller List</h6>
        {/* <button
          className="btn btn-primary m-1"
          data-bs-toggle="modal"
          data-bs-original-title="Add Seller"
          data-bs-target="#inputFormModal"
          onClick={() => openInputFormModal("", 'Seller')}
        >
          <i className="fa fa-plus text-white"></i>
        </button> */}
      </div>
      <Table
        dataSource={dataSource}
        columns={columnsSeller}
        pagination={false}
      />
    </>
  );
};
