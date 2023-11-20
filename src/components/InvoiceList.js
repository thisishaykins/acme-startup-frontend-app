import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { getInvoices } from '../services/api';
import InvoiceForm from './InvoiceForm';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
//   console.log(invoices);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await getInvoices();
//         setInvoices(response.data.invoices);
//       } catch (error) {
//         // Handle error
//         console.error('Error fetching invoices:', error);
//       }
//     };

//     fetchInvoices();
//   }, []);

    const fetchInvoices = async () => {
        try {
        const response = await getInvoices();
        setInvoices(response.data.invoices);
        } catch (error) {
        // Handle error
        console.error('Error fetching invoices:', error);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

  return (
    <section>
        <Row>
            <Col span={9}>
                <InvoiceForm onInvoiceCreated={fetchInvoices} />
            </Col>
            <Col span={15}>
                <h2>Invoices</h2>
                <ul>
                    {Array.isArray(invoices) && invoices.length > 0 ? (
                    invoices.map((invoice) => (
                    <li key={invoice.id}>
                        <strong>Invoice #{invoice.id}</strong>
                        <p>Date: {invoice.date}</p>
                        <p>Customer Name: {invoice.customerName}</p>
                        <p>Customer Address: {invoice.customerAddress}</p>
                        <ul>
                            {invoice.details.map((detail) => (
                                <li key={detail.id}>
                                    <p>Product Code: {detail.productCode}</p>
                                    <p>Product Description: {detail.productDescription}</p>
                                    <p>Price per Unit: {detail.productPricePerUnit}</p>
                                    <p>Quantity: {detail.productQuantity}</p>
                                </li>
                            ))}
                        </ul>
                        {/* Link to the detail view */}
                        <Link to={`/invoice/${invoice.id}`}>View Details</Link>
                    </li>
                    ))
                    ) : (
                    <p>No invoices available</p>
                    )}
                </ul>
            </Col>
        </Row>
    </section>
  );
};

export default InvoiceList;
