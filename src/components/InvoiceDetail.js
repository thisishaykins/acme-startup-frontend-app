import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInvoiceById } from '../services/api';

const InvoiceDetail = () => {
  const { invoiceId } = useParams();  // Use the useParams hook to get route parameters
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await getInvoiceById(invoiceId);
        setInvoice(response.data.invoice);
      } catch (error) {
        // Handle error
        console.error('Error fetching invoice detail:', error);
      }
    };

    fetchInvoiceDetail();
  }, [invoiceId]);

  if (!invoice) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Invoice Detail</h2>
      <p>Invoice #{invoice.sequenceNumber}</p>
      <p>Date: {invoice.date}</p>
      <p>Customer: {invoice.customerName}</p>
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
      <Link to={`/`}>Back</Link>
    </div>
  );
};

export default InvoiceDetail;
