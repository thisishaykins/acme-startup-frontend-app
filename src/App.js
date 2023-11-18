import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ACME Startup Invoicing App</h1>
      </header>
      {/* <InvoiceForm /> */}
      {/* <InvoiceList /> */}
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
