
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import DataRepository from "../../../../repositories/DataRepository";
import { useParams } from "react-router-dom";


import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import OrdersRepository from "../../../../repositories/OrdersRepository";
// import { color } from "html2canvas/dist/types/css/types/color";
const PrintPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  var [contact_list, set_contact_list] = useState([]);
    var [work_flow_group_list, set_work_flow_group_list] = useState([]);
    var [transaction_type_list, set_transaction_type_list] = useState([]);
    var [data_source_list, set_data_source_list] = useState([]);
      var [county_list, set_county_list] = useState([]);
      var [state_list, set_state_list] = useState([]);
        const [dataSellerSource, setSellerDataSource] = useState([]);
        const [dataBorrowerSource, setBorrowerDataSource] = useState([]);
        var [formData, setFormData] = useState({
          order_id: "",
          order_number: "",
          contact_id: "",
          open_date: "",
          close_date: "",
          due_date: "",
          arrival_date: "",
          delivery_date: "",
          active_workflow: "",
          assigned_to: "",
          street_address: "",
          unit: "",
          city_name: "",
          state_name: "",

          state_id: "",
          county_id: "",
          zipcode: "",
          parcel_id: "",
          sub_division: "",
          block: "",
          transaction_type_name: "",
          lot: "",
          section: "",
          land_value: "",
          improvement_value: "",
          total_assessed_value: "",
          product_type: "",
          transaction_type_id: "",
          work_flow_group_id: "",
          work_flow_group_name: "",
          data_source_name: "",
          property_type: "",
          data_source_id: "",
          add_in_product: "",
          county_name:"",
          customer_name: "",
          customer_address: "",
          customer_branch_code: "",
          lender_name: "",
          lender_address: "",
          lender_branch_code: "",
          file: "",
          loan: "",
          sales_price: "",
          loan_type: "",
          loan_date: "",
          workFlowGroup: "",
          loan_amount: "",
          description: "",
          order_status: "",
          status: "active",
        });
  var { order_id } = useParams();
console.log("invoiceData",invoiceData)
console.log("formData",formData);
  useEffect(() => {
    const fetch_data = async () => {
      try {
       const response = await OrdersRepository.orders_summary_index({
         order_id,
       });
       console.log("Edit API Response:", response); // Log response to debug

       if (response?.status === "SUCCESS") {
         const {
           contact_creation: contact = [],
           work_flow_group_creation: workFlowGroup = [],
           transaction_type_creation: transactionType = [],
           data_source_creation: dataSource = [],
           county_creation: county = [],
           state_creation: state = [],
         } = response;

         set_contact_list(
           contact.map((item) => ({
             value: item?.contact_id,
             label: item?.contact_name,
           }))
         );

         set_work_flow_group_list(
           workFlowGroup.map((item) => ({
             value: item?.work_flow_group_id,
             label: item?.work_flow_group_name,
           }))
         );

         set_transaction_type_list(
           transactionType.map((item) => ({
             value: item?.transaction_type_id,
             label: item?.transaction_type_name,
           }))
         );

         set_data_source_list(
           dataSource.map((item) => ({
             value: item?.data_source_id,
             label: item?.data_source_name,
           }))
         );

         set_county_list(
           county.map((item) => ({
             value: item?.county_id,
             label: item?.county_name,
           }))
         );

         set_state_list(
           state.map((item) => ({
             value: item?.state_id,
             label: item?.state_name,
           }))
         );
         const editData = response?.orders_summary_index || [];
         if (editData.length > 0) {
           const [data] = editData;
           setFormData({
             order_id,
             order_number: data?.order_number || "",
             order_status: data?.order_status || "",
             contact_id: data?.contact_id || "",
             open_date: data?.open_date || "",
             close_date: data?.close_date || "",
             due_date: data?.due_date || "",
             state_name:data?.state_name ||"",
             arrival_date: data?.arrival_date || "",
             delivery_date: data?.delivery_date || "",
             active_workflow: data?.active_workflow || "",
             assigned_to: data?.assigned_to || "",
             street_address: data?.street_address || "",
             unit: data?.unit || "",
             city_name: data?.city_name || "",
             state_id: data?.state_id || "",
             county_id: data?.county_id || "",
             zipcode: data?.zipcode || "",
             parcel_id: data?.parcel_id || "",
             county_name:data?.county_name|| "",
             sub_division: data?.sub_division || "",
             block: data?.block || "",
             lot: data?.lot || "",
             section: data?.section || "",
             land_value: data?.land_value || "",
             improvement_value: data?.improvement_value || "",
             total_assessed_value: data?.total_assessed_value || "",
             product_type: data?.product_type || "",
             transaction_type_id: data?.transaction_type_id || "",
             work_flow_group_id: data?.work_flow_group_id || "", 
             work_flow_group_name:data?.work_flow_group_name || "",
             data_source_name:data?.data_source_name ||"",
             data_source_id: data?.data_source_id || "",
             property_type: data?.property_type || "",
             add_in_product: data?.add_in_product || "",
             transaction_type_name:data?.transaction_type_name|| "",
             customer_name: data?.customer_name || "",
             customer_address: data?.customer_address || "",
             customer_branch_code: data?.customer_branch_code || "",
             lender_name: data?.lender_name || "",
             lender_address: data?.lender_address || "",
             lender_branch_code: data?.lender_branch_code || "",
             file: data?.file || "",
             loan: data?.loan || "",
             sales_price: data?.sales_price || "",
             loan_type: data?.loan_type || "",
             loan_date: data?.loan_date || "",
             loan_amount: data?.loan_amount || "",
             description: data?.description || "",
             status: data?.status,
           });
         }
       } else {
         console.error("Edit API did not return success status");
       }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_data();
  }, [order_id]);

   const fetch_borrower_data = async () => {
     try {
       const response1 =
         await OrdersRepository.orders_summary_borrower_or_seller_index({
           order_id: order_id,
           borrower_or_seller: "Borrower",
         });
  setBorrowerDataSource(response1?.order_borrower_or_seller_index); 
       if (response1 && response1.status === "SUCCESS") {
       setBorrowerDataSource(response1?.order_borrower_or_seller_index); 
       
       }
     } catch (error) {
       console.error("Failed to fetch data:", error);
     }
   };
   useEffect(() => {
     fetch_borrower_data();
     fetch_seller_data();
   }, [order_id]);
     const fetch_seller_data = async () => {
       try {
         const response1 =
           await OrdersRepository.orders_summary_borrower_or_seller_index({
             order_id: order_id,
             borrower_or_seller: "Seller",
           });
 setSellerDataSource(response1?.order_borrower_or_seller_index); 
         if (response1 && response1.status === "SUCCESS") {
          setSellerDataSource(response1?.order_borrower_or_seller_index); 
         }

       } catch (error) {
         console.error("Failed to fetch data:", error);
       }
     };
     console.log("dataSellerSource", dataSellerSource, dataBorrowerSource);
  // const selectedOptionOrderStatus = order_status.find(
  //   (option) => option.value === formData?.order_status
  // );
  const totalAmount = invoiceData.reduce((acc, item) => acc + parseFloat(item.total), 0);
  console.log("totalAmount",totalAmount.toFixed(2))
  return (
    <MDBContainer className="py-5" style={{}}>
      <MDBCard className="p-4"  >
        <MDBCardBody>
          {/* Invoice Information */}
          {/* <MDBContainer
            className="mb-2 mt-3"
            style={{ height: "110px", backgroundColor: "#F9F9F9" }}
          >
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xl="6" className="text">
                <h2 style={{ color: "#242424", padding: "30px 28px" }}>
                  <strong style={{ fontSize: "35px" }}>Order Summary</strong>
                </h2>
              </MDBCol>
              <MDBCol xl="6" className="text">
                <h2
                  style={{
                    color: "rgb(102, 135, 175)", // Corrected color format
                    padding: "30px 0",
                    height: "125px",
                    backgroundColor: "#ffb32d",
                    borderBottomLeftRadius: "100px",
                  }}
                >
                  <strong style={{ color: "white", paddingLeft: "91px" }}>
                    Order Id:
                  </strong>
                  <br />
                  <strong style={{ color: "white", paddingLeft: "40px" }}>
                    Order Name:
                  </strong>
                </h2>
              </MDBCol>
            </MDBRow>
          </MDBContainer> */}

          <MDBContainer
            className="mb-2 mt-3 p-3"
            style={{ backgroundColor: "#F9F9F9", height: "auto" }}
          >
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xs="12" md="6" className="text-center">
                <h2 className="text-dark py-3">
                  <strong className="fs-1">Order Summary</strong>
                </h2>
              </MDBCol>
              <MDBCol
                xs="12"
                md="6"
                className="text-center bg-warning text-light"
                style={{ borderBottomLeftRadius: "100px", height: "auto" }}
              >
                <h2 className="py-3">
                  <strong className="ps-3">
                    Order No:{formData?.order_number}
                  </strong>
                  <br />
                  {/* <strong className="ps-3">Order Name:</strong> */}
                </h2>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <hr />
          <MDBContainer
            className="mb-2 mt-3"
            style={{
              borderRadius: "20px",
              border: "1px solid rgb(197, 197, 197)",
              paddingLeft: "55px",
            }}
          >
            {/* First Row of Information */}
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Order Number */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Order Number:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.order_number}
                    </span>
                  </li>

                  {/* Customer Name */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Customer Name:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.customer_name}
                    </span>
                  </li>

                  {/* Order Status */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Order Status:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.order_status}
                    </span>
                  </li>

                  {/* Open Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Open Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.open_date}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>

            {/* Second Row of Information */}
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Close Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.close_date}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Due Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.due_date}
                    </span>
                  </li>

                  {/* Arrival Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Arrival Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.arrival_date}
                    </span>
                  </li>

                  {/* Delivery Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Delivery Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.delivery_date}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>

            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Active WorkFlow:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.active_workflow}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Assigned To:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.assigned_to}
                    </span>
                  </li>

                  {/* Arrival Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Street Address:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.street_address}
                    </span>
                  </li>

                  {/* Delivery Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Unit :
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.unit}</span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      City Name:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.city_name}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      State Name:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.state_name}
                    </span>
                  </li>

                  {/* Arrival Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      County Name:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.county_name}
                    </span>
                  </li>

                  {/* Delivery Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      ZipCode:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.zipcode}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Parcel Id:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.parcel_id}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Sub Division:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.sub_division}
                    </span>
                  </li>

                  {/* Arrival Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Block:
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.block}</span>
                  </li>

                  {/* Delivery Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Lot:
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.lot}</span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Section:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.section}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Land Value :
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.land_value}
                    </span>
                  </li>

                  {/* Arrival Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Improvement Value:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.improvement_value}
                    </span>
                  </li>

                  {/* Delivery Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Total Assessed Value *:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.total_assessed_value}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  {/* Close Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Description:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.description}
                    </span>
                  </li>

                  {/* Due Date */}
                  <li
                    className="text-muted mb-3"
                    style={{ flex: "1", textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Status:
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.status}</span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xl="12" className="text-left">
                <h3
                  style={{
                    color: "white",
                    backgroundColor: "#ffb32d",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Orders Setup</strong>
                </h3>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer
            className="mb-2 mt-3 p-3"
            style={{
              borderRadius: "20px",
              border: "1px solid rgb(197, 197, 197)",
            }}
          >
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Product Type:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.product_type}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Transaction Type:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.transaction_type_name || "Null"}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Work Flow Group:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.work_flow_group_name}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Property Type:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.property_type}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>

            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Data Source:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.data_source_name || "Null"}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Add-in Product/Service:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.add_in_product}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer id="transaction-details" className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xl="12" className="text-left">
                <h3
                  style={{
                    color: "white",
                    backgroundColor: "#ffb32d",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Transaction Details</strong>
                </h3>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <MDBContainer
            className="mb-2 mt-3 p-3"
            style={{
              borderRadius: "20px",
              border: "1px solid rgb(197, 197, 197)",
            }}
          >
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Customer Name:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.customer_name}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Address:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.customer_address}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Branch Code:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.customer_branch_code || "null"}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Lender:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.lender_name || "null"}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Address:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.lender_address}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Branch Code:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.lender_branch_code}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      File:
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.file}</span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Loan:
                    </span>
                    <span style={{ fontSize: "16px" }}>{formData?.loan}</span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-4">
              <MDBCol xl="12">
                <MDBTypography
                  listUnStyled
                  className="d-flex flex-wrap justify-content-between align-items-center"
                >
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Sales Price:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.sales_price}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Loan Type:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.loan_type}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Loan Date:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.loan_date}
                    </span>
                  </li>
                  <li
                    className="text-muted mb-3"
                    style={{ flex: 1, textAlign: "left" }}
                  >
                    <span
                      className="fw-bold d-block"
                      style={{
                        color: "#242424",
                        fontWeight: 600,
                        fontSize: "19px",
                      }}
                    >
                      Loan Amount:
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {formData?.loan_amount}
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xl="12" className="text-left">
                <h3
                  style={{
                    color: "white",
                    backgroundColor: "#ffb32d",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Borrower List</strong>
                </h3>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="my-2 mx-1 justify-content-center">
              <MDBTable
                striped
                borderless
                className="table-bordered"
                style={{ border: "1px solid red" }}
              >
                <MDBTableHead
                  className="text-white"
                  style={{
                    color: "#242424",
                    backgroundColor: "#F9F9F9",
                    border: "1px solid #ddd",
                  }} // Border for table header
                >
                  <tr>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      #{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      Borrower List{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      SSN{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      DOB{" "}
                    </th>
                  </tr>
                </MDBTableHead>
                {dataBorrowerSource.length > 0 ? (
                  <MDBTableBody>
                    {dataBorrowerSource.map((item, index) => (
                      <tr key={index}>
                        <td style={{ border: "1px solid #ddd" }}>
                          {index + 1}
                        </td>
                        <td style={{ border: "1px solid #ddd" }}>
                          {item.borrower_or_seller}
                        </td>
                        <td style={{ border: "1px solid #ddd" }}>{item.ssn}</td>
                        <td style={{ border: "1px solid #ddd" }}>{item.dob}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                ) : (
                  <MDBTableBody>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          border: "1px solid #ddd",
                        }}
                      >
                        No table data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                )}
              </MDBTable>
            </MDBRow>
          </MDBContainer>

          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="d-flex align-items-baseline justify-content-center">
              <MDBCol xl="12" className="text-left">
                <h3
                  style={{
                    color: "white",
                    backgroundColor: "#ffb32d",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                >
                  <strong>Seller List</strong>
                </h3>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBContainer className="mb-2 mt-3">
            <MDBRow className="my-2 mx-1 justify-content-center">
              <MDBTable striped className="table-bordered">
                <MDBTableHead
                  className="text-white"
                  style={{
                    color: "#242424",
                    backgroundColor: "#F9F9F9",
                    border: "1px solid #ddd",
                  }} // Add border to table head
                >
                  <tr>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      #{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      Seller Name{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      SSN{" "}
                    </th>
                    <th
                      style={{ color: "#242424", border: "1px solid #ddd" }}
                      scope="col"
                    >
                      {" "}
                      DOB{" "}
                    </th>
                  </tr>
                </MDBTableHead>
                {dataSellerSource.length > 0 ? (
                  <MDBTableBody>
                    {dataSellerSource.map((item, index) => (
                      <tr key={index}>
                        <td style={{ border: "1px solid #ddd" }}>
                          {index + 1}
                        </td>
                        <td style={{ border: "1px solid #ddd" }}>
                          {item.order_borrower_or_seller_id}
                        </td>
                        <td style={{ border: "1px solid #ddd" }}>{item.ssn}</td>
                        <td style={{ border: "1px solid #ddd" }}>{item.dob}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                ) : (
                  <MDBTableBody>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          border: "1px solid #ddd",
                        }}
                      >
                        No table data found.
                      </td>
                    </tr>
                  </MDBTableBody>
                )}
              </MDBTable>
            </MDBRow>
          </MDBContainer>

          {/* Footer */}

          {/* <MDBRow>
            <MDBCol xl="12">
              <p
                style={{
                  color: "#6c757d",
                  textAlign: "center",
                  fontSize: "larger",
                  fontWeight: 600,
                }}
              >
                Thank you for your business!
              </p>
            </MDBCol>
          </MDBRow> */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default PrintPage;
