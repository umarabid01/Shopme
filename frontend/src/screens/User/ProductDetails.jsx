import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";

function ProductDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="product-details-page container py-5">
        <div className="details-empty-state">
          <p className="eyebrow">PRODUCT NOT FOUND</p>
          <h2>Choose a product to see its details.</h2>
          <button className="hero-button" onClick={() => navigate("/")}>Browse products <span>-&gt;</span></button>
        </div>
      </div>
    );
  }

  const addToCart = async () => {
    if (!getCurrentUser()) {
      navigate("/login", { state: { message: "Please sign in before adding items to your cart." } });
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pd_id: state.pd_id,           
          profile_id: getCurrentUser().pf_id,
          quantity: 1,
          totalprice: state.numericPrice        
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        alert("Item added to cart!");
        navigate("/cart");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="product-details-page container py-5">
      <button className="details-back-button" onClick={() => navigate(-1)}>&lt;- Back to collection</button>
      <div className="product-details-layout">
        <div className="details-image-panel">
          <span className="details-badge">NEW ARRIVAL</span>
          <img src={state.imgsrc} className="details-image" alt={state.title} />
        </div>
        <div className="details-content">
          <p className="eyebrow">EVERYDAY EDIT</p>
          <h1>{state.title}</h1>
          <p className="details-price">{state.price}</p>
          <div className="details-divider" />
          <div className="details-description">
            <h2>About this piece</h2>
            <p>{state.text || "A thoughtfully selected piece made for everyday living."}</p>
          </div>
          {state.colors && <p className="details-meta"><strong>Available color</strong><span>{state.colors}</span></p>}
          <div className="details-actions">
            <button className="hero-button" onClick={addToCart}>Add to cart <span>-&gt;</span></button>
            <button className="details-secondary-button" onClick={() => navigate("/")}>Continue shopping</button>
          </div>
          <p className="details-note">Secure checkout · Easy returns · Carefully packed</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;