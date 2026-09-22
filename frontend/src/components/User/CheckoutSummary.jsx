import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';

function CheckoutSummary() {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const location = useLocation();
  const navigate = useNavigate();
  const subtotal = location.state?.subtotal || 0;
  const cartItems = location.state?.cartItems || [];

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handlePlaceOrder=async()=>{
  try
  {
    const res= await fetch(`${process.env.REACT_APP_API_URL}/api/billing`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        orderItems:cartItems,
        totalAmount:subtotal,
        totalQuantity:totalQuantity,
        paymentMethod: paymentMethod,
        profile_id: getCurrentUser().pf_id
      })
    });
    const data=await res.json();
    console.log("Order placed successfully:", data);
if(data.success){
  alert("data saved in order")
    navigate("/order")
  }
    else{
      alert("error to save data")
    }
  }catch(err)
  {
    console.log("Error placing order:", err);
  }
};


  return (
    <div className="text-white">
      <h3>Order Summary</h3>
      {cartItems.map((item) => (
        <div key={item.c_id} className="card mb-2" style={{ backgroundColor: '#2c2c2c' }}>
          <div className="card-body d-flex justify-content-between">
            <div>
              <h6 className="text-white">{item.name}</h6>
              <small>Qty: {item.quantity} × Rs.{item.price}</small>
            </div>
            <strong className="text-warning">Rs.{item.total_price}</strong>
          </div>
        </div>
      ))}
      
      <h3>Payment Method</h3>
      <br />
      
      <div className="row mb-4">
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cash"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label text-white" htmlFor="cash">
              Cash on Delivery
            </label>
          </div>
        </div>
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="card"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label text-white" htmlFor="card">
              Card Payment
            </label>
          </div>
        </div>
      </div>

      {paymentMethod === 'cash' && (
        <div className="alert alert-warning">
          <h5>Cash on Delivery Selected</h5>
          <p>You will pay Rs.{subtotal} when your order is delivered to your address.</p>
        </div>
      )}

      {paymentMethod === 'card' && (
        <div>
          <h4>Card Details</h4>
          <br />
          
          <div className="row mb-3">
            <div className="col-8">
              <label className="form-label text-white">Card Number</label>
              <input 
                type="text"
                placeholder="Card Number"
                className="form-control"
              />
            </div>
            <div className="col-4">
              <label className="form-label text-white">CVC</label>
              <input 
                type="text"
                placeholder="CVC"
                className="form-control"
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-6">
              <label className="form-label text-white">Expiry Date</label>
              <input 
                type="text"
                placeholder="MM/YY"
                className="form-control"
              />
            </div>
          </div>
        </div>
      )}
      
      <h4 className="mx-2 py-3 text-warning">Total Amount: Rs.{subtotal}</h4>
      
      <button 
        className="btn btn-warning mx-2 btn-lg"
        onClick={handlePlaceOrder}
      >
        {paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
      </button>
    </div>
  );
}

export default CheckoutSummary;