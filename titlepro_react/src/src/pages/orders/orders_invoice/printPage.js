import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import DataRepository from "../../../../repositories/DataRepository";
import { useParams } from "react-router-dom";
// import Avatar from "boring-avatars";
import image from './bg.png';






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





const PrintPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  var { order_id } = useParams();
console.log("invoiceData",invoiceData)
  useEffect(() => {
    const fetch_data = async () => {
      try {
        const response = await DataRepository.orders_invoice_print({ order_id });
        console.log("response123",response)
        setInvoiceData(response.order_invoice_billed || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetch_data();
  }, [order_id]);
  const totalAmount = invoiceData.reduce((acc, item) => acc + parseFloat(item.total), 0);
  console.log("totalAmount",totalAmount.toFixed(2))
  const orderNumber = invoiceData?.[0]?.order_number ?? "null";
   const InvoiceDate = invoiceData?.[0]?.invoice_date ?? "null";
    const dueDate = invoiceData?.[0]?.due_date ?? "null";
      const address = invoiceData?.[0]?.address ?? "null";
  return (
    <MDBContainer className="py-5" >
      <MDBCard className="p-4">
        <MDBCardBody>
          {/* Invoice Information */}

       

          <MDBContainer className="mb-2 mt-3" style={{ height: "100px" ,backgroundImage: `url(${image})`,marginTop: "10px" }}>
            <MDBRow>
              <MDBCol xl="12">
                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                  {/* Uncomment if you want to display invoice ID: Invoice &gt;&gt; <strong>ID:</strong> */}
                </p>
                <h2
                  style={{
                    padding: "13px 2px",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "50px",
                  }}
                >
                  INVOICE
                </h2>
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <MDBRow
            className="my-4 d-flex justify-content-between"
            style={{ marginBottom: "40px", marginTop: "40px", padding: "10px" }}
          >
            <MDBCol xl="12">
              <MDBTypography
                listUnStyled
                className="d-flex justify-content-between"
              >
                {/* From Section */}
                <ul className="list-unstyled">
                  <li className="text-muted">
                    {" "}
                    <span style={{ fontWeight: "500", color: "#4b4f52" }}>
                      From:
                    </span>{" "}
                    <span style={{}}>Your Company</span>
                  </li>
                  <li className="text-muted">123 Your Street, City</li>
                  <li className="text-muted">State, Country</li>
                  <li className="text-muted">
                    <MDBIcon fas icon="phone-alt" /> 123-456-789
                  </li>
                </ul>

                {/* Invoice To Section */}
                <ul className="list-unstyled">
                  <li className="text-muted">
                    {" "}
                    <span style={{ fontWeight: "500", color: "#4b4f52" }}>
                      Invoice To:
                    </span>
                    <span style={{}}>John Lorem</span>
                  </li>
                  {/* <li className="text-muted">{address}</li> */}
                  <li className="text-muted">State, Country</li>
                  <li className="text-muted">
                    <MDBIcon fas icon="phone-alt" /> 123-456-789
                  </li>
                </ul>
              </MDBTypography>
            </MDBCol>
          </MDBRow>

          <MDBRow
            className="my-4 d-flex justify-content-between"
            style={{ marginBottom: "40px", marginTop: "40px", padding: "10px" }}
          >
            {" "}
            {/* Added marginTop and marginBottom */}
            <MDBCol xl="12">
              <MDBTypography
                listUnStyled
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <li className="text-muted" style={{ marginRight: "30px" }}>
                  {" "}
                  {/* Add margin-right */}
                  <span
                    className="fw-bold"
                    style={{ fontWeight: "500", color: "#4b4f52" }}
                  >
                    Invoice Date:
                  </span>{" "}
                  {InvoiceDate}
                </li>
                <li className="text-muted" style={{ marginRight: "30px" }}>
                  {" "}
                  {/* Add margin-right */}
                  <span
                    className="fw-bold"
                    style={{ fontWeight: "500", color: "#4b4f52" }}
                  >
                    Due Date:
                  </span>{" "}
                  {dueDate}
                </li>
                <li className="text-muted">
                  <span
                    className="fw-bold"
                    style={{ fontWeight: "500", color: "#4b4f52" }}
                  >
                    Payment Terms:
                  </span>{" "}
                  Net 30
                </li>
              </MDBTypography>
            </MDBCol>
          </MDBRow>

          {/* Invoice Table */}
          <MDBRow
            className="my-2 mx-1 justify-content-center"
            style={{ padding: "10px" }}
          >
            <MDBTable striped borderless>
              <MDBTableHead
                className="text-white">
                
              
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col">Cost Per Unit</th>
                  <th scope="col">No of Unit</th>
                  <th scope="col">Total</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {invoiceData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.transaction_type_name}</td>
                    <td>${item.cost_per_units}</td>
                    <td>{item.no_of_units}</td>
                    <td style={{ color: "#ff950c" }}>${item.total}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBRow>

          {/* Total Amount */}
          <MDBRow style={{ padding: "10px",textAlign: "right" }}>
            <MDBCol xl="12">
              <p className="text-black float-start" style={{  }}>
                <React.Fragment>
                  <span className="text-black me-3">Grand Total:</span>
                  <span style={{ fontSize: "25px", color: "#ff950c" }}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </React.Fragment>
              </p>
            </MDBCol>
          </MDBRow>

          <hr />
          <MDBRow
            className="d-flex"
            style={{ justifyContent: "space-between", padding: "10px" }}
          >
            <MDBCol xl="auto" style={{ width: "50%", textAlign: "left" }}>
              <p style={{ color: "#4b4f52", marginBottom: "0.5rem" }}>
                <strong>Terms and Conditions:</strong>
              </p>
              <p style={{ color: "#6c757d", marginBottom: "0" }}>
                Payment is due within 30 days from the invoice date. Late
                payments may incur additional charges.
              </p>
            </MDBCol>
            <MDBCol xl="auto" style={{ width: "50%", textAlign: "right" }}>
              <p
                style={{
                  color: "#4b4f52",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                <strong>Signature</strong>
              </p>
              {/* Add Signature content here */}
            </MDBCol>
          </MDBRow>

          {/* Terms and Conditions / Payment Info */}
          <MDBRow style={{ padding: "10px" }}>
            <MDBCol
              xl="6"
              className="d-flex flex-column"
              style={{ marginTop: "20px" }}
            >
              <p style={{ color: "#4b4f52" }}>
                <strong>Payment Info:</strong>
              </p>
              <p style={{ color: "#6c757d" }}>
                Please make payment to the following account: <br />
                Bank Name: Your Bank <br />
                Account No: 1234567890 <br />
                IBAN: ABCDEF12345678
              </p>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol xl="12">
              <p
                style={{
                  color: "#1399ae",
                  textAlign: "center",
                  fontSize: "larger",
                }}
              >
                Thank you for your business!
              </p>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xl="12">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#03856c"
                  fillOpacity="1"
                  d="M0,160L80,138.7C160,117,320,75,480,80C640,85,800,139,960,165.3C1120,192,1280,192,1360,192L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                ></path>
              </svg>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default PrintPage;