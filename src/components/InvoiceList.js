import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
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
                <Row gutter={16}>
                    {Array.isArray(invoices) && invoices.length > 0 ? (
                        invoices.map((invoice) => (
                        <Col span={8}>
                            <Card 
                                type="inner" 
                                title={'Invoice ' + invoice.id} 
                                key={invoice.id} bordered={true}
                                extra={<Link to={`/invoice/${invoice.id}`}>View Details</Link>}>
                                <p><small>Date:</small><br/> {invoice.date}</p>
                                <p><small>Customer Name:</small><br/> {invoice.customerName}</p>
                                <p><small>Customer Address:<br/> {invoice.customerAddress}</small></p>
                                <small><strong>Invoice Counts: {invoice.details.length}</strong></small>
                                {/* <ul>
                                    {invoice.details.map((detail) => (
                                        <li key={detail.id}>
                                            <p>Product Code: {detail.productCode}</p>
                                            <p>Product Description: {detail.productDescription}</p>
                                            <p>Price per Unit: {detail.productPricePerUnit}</p>
                                            <p>Quantity: {detail.productQuantity}</p>
                                        </li>
                                    ))}
                                </ul> */}
                                {/* Link to the detail view */}
                                {/* <Link to={`/invoice/${invoice.id}`}>View Details</Link> */}
                            </Card>
                        </Col>
                        ))
                    ) : (
                        <p>No invoices available. fetching...</p>
                    )}
                </Row>
            </Col>
        </Row>
    </section>
  );
};

export default InvoiceList;
