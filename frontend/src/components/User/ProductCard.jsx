import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/auth";

function ProductCard(props) {
  const navigate = useNavigate();

  const godetail=()=> {
    navigate('/detail',{state:props});
  };

  const addtocart = async () => {
  if (!getCurrentUser()) {
    navigate("/login", { state: { message: "Please sign in before adding items to your cart." } });
    return;
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pd_id: props.pd_id,          
        profile_id: getCurrentUser().pf_id,
        quantity: 1,
        totalprice: props.numericPrice 
      }),
    });
    
    const data = await response.json();
    if (data.success) {
      alert("Item added to cart!");
    } else {
      alert(data.message || "Failed to add to cart");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
};
  
  return (
    <article className="product-card h-100">
      <img 
        src={props.imgsrc} 
        className="product-image"
        alt={props.title}
        onClick={godetail}
      />
      <div className="product-body">
        <p className="product-label">New arrival</p>
        <h5 className="product-title" onClick={godetail}>{props.title}</h5>
        <p className="product-description">{(props.text || "Quality essentials for everyday living.").slice(0, 64)}</p>
        <div className="d-flex justify-content-between align-items-center gap-2 mt-auto">
          <h5 className="product-price">{props.price}</h5>
          <button className="add-button" onClick={addtocart} aria-label={`Add ${props.title} to cart`}>+</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;