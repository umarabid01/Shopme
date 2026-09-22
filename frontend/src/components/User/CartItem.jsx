import React, { useState } from "react";
import { getCurrentUser } from "../../utils/auth";

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity || 1);
  
  const increment = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/increment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          pd_id: props.pd_id, 
          profile_id: getCurrentUser().pf_id,
          price: parseInt(props.price) 
        }),
      });
      
      if (response.ok) {
        setQuantity(quantity + 1);
        if (props.onUpdate) props.onUpdate(); // Refresh cart
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };
  
  const decrement = async () => {
    if (quantity > 1) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/decrement`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            pd_id: props.pd_id, 
            profile_id: getCurrentUser().pf_id,
            price: parseInt(props.price) 
          }),
        });
        
        if (response.ok) {
          setQuantity(quantity - 1);
          if (props.onUpdate) props.onUpdate(); // Refresh cart
        }
      } catch (err) {
        console.error("Error updating cart:", err);
      }
    }
  };

const handleRemove=async() => {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        pd_id: parseInt(props.pd_id),
        profile_id: getCurrentUser().pf_id
      }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Item removed from cart!");
      if (props.onUpdate) props.onUpdate();
    } else {
      alert(data.message || "Failed to remove item");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};

  const calculateTotal = () => {
    return quantity * parseInt(props.price);
  };

  return (
    <div className="cart-item mb-4">
      <div className="row">
        <div className="col-3">
          <img
            src={props.imgsrc}
            className="cart-item-image"
            alt={props.title}
          />
        </div>
        <div className="col-6">
          <div className="card-body">
            <p className="product-label">Selected item</p>
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text text-muted">{props.text}</p>
            <p className="card-price fw-semibold">Unit price: Rs.{props.price}</p>
          </div>
        </div>
        <div className="col-3">
          <h5>Quantity:</h5>
          <div className="row">
            <div className="col-2">
              <button className="quantity-button" onClick={decrement}>-</button>
            </div>
            <div className="col-6">
              <p className="quantity-value">{quantity}</p>
            </div>
            <div className="col-2">
              <button className="quantity-button" onClick={increment}>+</button>
            </div>
          </div>
          <hr />
          <h5 className="cart-item-total">Total: Rs.{calculateTotal()}</h5>
          <div className="row">
            <div className="col-12">
              <button 
                className="remove-button" 
                onClick={handleRemove}  // Use local handleRemove function
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;