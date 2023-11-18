import React, { useState } from 'react';
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
    <form onSubmit={handleSubmit}>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <h2>Create Invoice</h2>
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      <label>Customer Name:</label>
      <input
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        required
      />

      <label>Customer Address:</label>
      <input
        type="text"
        name="customerAddress"
        value={formData.customerAddress}
        onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
        required
      />

      <h3>Details:</h3>
      {formData.details.map((detail, index) => (
        <div key={index}>
          <label>Product Code:</label>
          <input
            type="text"
            name="productCode"
            value={detail.productCode}
            onChange={(e) => handleInputChange(e, index)}
            required
          />

          <label>Product Description:</label>
          <input
            type="text"
            name="productDescription"
            value={detail.productDescription}
            onChange={(e) => handleInputChange(e, index)}
            required
          />

          <label>Price per Unit:</label>
          <input
            type="number"
            name="productPricePerUnit"
            value={detail.productPricePerUnit}
            onChange={(e) => handleInputChange(e, index)}
            required
          />

          <label>Quantity:</label>
          <input
            type="number"
            name="productQuantity"
            value={detail.productQuantity}
            onChange={(e) => handleInputChange(e, index)}
            required
          />
        </div>
      ))}
      
      <button type="button" onClick={handleAddDetail}>
        Add Detail
      </button>

      <button type="submit">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
