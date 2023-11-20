import React, { useState } from 'react';
import { Card, Alert } from 'antd';
import { createInvoice } from '../services/api';

const InvoiceForm = ({ onInvoiceCreated }) => {
  const [formData, setFormData] = useState({
    date: '',
    customerName: '',
    customerAddress: '',
    details: [
      {
        productCode: '',
        productDescription: '',
        productPricePerUnit: '',
        productQuantity: '',
      },
    ],
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDetails = [...formData.details];
    updatedDetails[index][name] = value;
    setFormData({ ...formData, details: updatedDetails });
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        {
          productCode: '',
          productDescription: '',
          productPricePerUnit: '',
          productQuantity: '',
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createInvoice(formData);
      // Handle success, redirect, or update state as needed
      setSuccessMessage('Invoice created successfully!');
      // Reset the form
      setFormData({
        date: '',
        customerName: '',
        customerAddress: '',
        details: [
          {
            productCode: '',
            productDescription: '',
            productPricePerUnit: '',
            productQuantity: '',
          },
        ],
      });
      // Trigger a refresh in the parent component
      onInvoiceCreated();
    } catch (error) {
      // Handle error
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <Card type="inner" title="Create Invoice" bordered={true} className='form-card'>
        <form onSubmit={handleSubmit} className='nice-form'>

            {successMessage && <Alert message={successMessage} type="success" />}
            <div class="nice-form-group">
                <label>Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />
            </div>

            <div class="nice-form-group">
                <label>Customer Name:</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                />
            </div>

            <div class="nice-form-group">
                <label>Customer Address:</label>
                <input
                    type="text"
                    name="customerAddress"
                    value={formData.customerAddress}
                    onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                    required
                />
            </div>

            <h3>Product Details:</h3>
            {formData.details.map((detail, index) => (
                <div className='product-item' key={index}>
                    <div class="nice-form-group">
                        <label>Product Code:</label>
                        <input
                            type="text"
                            name="productCode"
                            value={detail.productCode}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                        />
                    </div>

                    <div class="nice-form-group">
                        <label>Product Description:</label>
                        <input
                            type="text"
                            name="productDescription"
                            value={detail.productDescription}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                        />
                    </div>

                    <div class="nice-form-group">
                        <label>Price per Unit:</label>
                        <input
                            type="number"
                            name="productPricePerUnit"
                            value={detail.productPricePerUnit}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                        />
                    </div>

                    <div class="nice-form-group">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="productQuantity"
                            value={detail.productQuantity}
                            onChange={(e) => handleInputChange(e, index)}
                            required
                        />
                    </div>
                </div>
            ))}
            
            <button type="button" onClick={handleAddDetail}>
                + Add Product
            </button>
            <hr/>
            <button className='nice-button' type="submit">Create Invoice</button>
        </form>
    </Card>
  );
};

export default InvoiceForm;
