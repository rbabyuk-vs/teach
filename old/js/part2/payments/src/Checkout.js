// Official MonoPay API https://monobank.ua/api-docs/acquiring/instrumenty-rozrobky/testuvannia/docs--testing
// test cards: https://docs.adyen.com/development-resources/testing/test-card-numbers/
// paypal  https://developer.paypal.com/home/
// https://developer.paypal.com/integration-builder/
// PayPal creds https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdashboard%2Fapplications%2Fsandbox&intent=developer&ctxId=ul11a066f6c9f24569adf8595e023b30ee&_ga=2.151349946.2086199219.1740560002-1344891736.1740424892


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paypal from "./Paypal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';


const MONOBANK_API_URL = "https://api.monobank.ua/api/merchant/invoice/create";
const MONOBANK_TOKEN = process.env.REACT_APP_API_KEY; // Replace with your actual MonoPay token

const Checkout = () => {
  const [amount, setAmount] = useState(100);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createInvoice = async () => {
    try {
      if (!MONOBANK_TOKEN) {
        throw new Error("Missing MonoPay API token");
      }

      const response = await fetch(MONOBANK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": MONOBANK_TOKEN,
        },
        body: JSON.stringify({
          amount: amount * 100, // Monobank requires amount in kopiykas (cents)
          ccy: 980, // UAH currency code
          redirectUrl: "http://localhost:3000/success", // Change to your success page
          webHookUrl: "http://localhost:3000/webhook", // Webhook for payment status updates
          reference: "test-payment-12345",
          merchantPaymInfo: { destination: "Test Payment via MonoPay" },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.pageUrl) {
        window.location.href = data.pageUrl; // Redirect to MonoPay checkout
      } else {
        throw new Error("Failed to create invoice: Missing pageUrl");
      }
    } catch (err) {
      console.error("Invoice creation error:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search);
      if (query.get("paymentStatus") === "success") {
        navigate("/success"); // Redirect back after successful payment
      }
    } catch (err) {
      console.error("Error processing URL query parameters:", err);
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>MonoPay Checkout</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button 
        onClick={createInvoice} 
        style={{ 
          marginLeft: "10px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "#000000",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        <FontAwesomeIcon icon={faCreditCard} />
        Pay with MonoPay
      </button>
      
      <div style={{ maxWidth: "300px", margin: "20px auto" }}>
        <Paypal />
      </div>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Checkout;
