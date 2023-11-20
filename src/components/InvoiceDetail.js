import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons';
import { Card, Table, Tag } from 'antd';
import { getInvoiceById } from '../services/api';

const calProduct = (units, amount) => {
    let USD = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    return USD.format(units * Number(amount))
}

const columns = [
  {
    title: 'Product Code',
    dataIndex: 'productCode',
    key: 'productCode',
  },
  {
    title: 'Product Description',
    dataIndex: 'productDescription',
    key: 'productDescription',
  },
  {
    title: 'Product Price Per Unit ($)',
    dataIndex: 'productPricePerUnit',
    key: 'productPricePerUnit',
    sorter: true,
  },
  {
    title: 'Product Quantity',
    dataIndex: 'productQuantity',
    key: 'productQuantity',
    sorter: true,
  },
  {
    title: 'Total Product Amount ($)',
    render: row => {
        if (row.id) {
        return calProduct(row.productQuantity, row.productPricePerUnit);
        }
    }
  },
];

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
    return <p className='loading-data'>
            <LoadingOutlined className='loading-icon' /><br/>
            Fetching invoice data...</p>;
  }

  return (
    <Card title="Invoice Details">
        <Card type="inner" title="Customer Details">
            <p>Invoice #{invoice.sequenceNumber} </p>
            <p><small>Date:</small><br/> {invoice.date}</p>
            <p><small>Customer Name:</small><br/> {invoice.customerName}</p>
            <p><small>Customer Address:<br/> {invoice.customerAddress}</small></p>
        </Card>
        <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Invoice Products"
            >
            <Table 
                columns={columns} 
                dataSource={invoice.details}
                bordered
                footer={() => 'Total products counts: ' + invoice.details.length} />
            <Link to={`/`}>Back</Link>
        </Card>
    </Card>
  );
};

export default InvoiceDetail;
