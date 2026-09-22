import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/User/CartItem';
import { getCurrentUser } from '../../utils/auth';

function ShoppingCart() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart?profile_id=${user.pf_id}`);
      const data = await response.json();
      
      if (data.success) {
        setCartItems(data.cartItems);
      } else {
        console.error("Failed to load cart items");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (getCurrentUser()) fetchCartItems();
  }, [fetchCartItems]);

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + (item.total_price || 0), 0);
  };

   const handleCheckout = () => {
    const subtotal = calculateSubTotal();
    
    navigate("/billing", { 
      state: { 
        cartItems: cartItems,
        subtotal: subtotal
      }
    });
  };
  

  if (!user) {
    return <div className="page-section container py-5"><div className="account-panel"><p className="eyebrow">MEMBERS ONLY</p><h2>Your cart is waiting.</h2><p>Sign in to add products, view your cart, and continue to checkout.</p><button className="hero-button" onClick={() => navigate("/login")}>Sign in to continue</button></div></div>;
  }

  if (loading) {
    return <div className="page-section container py-5"><div className="loading-state">Loading your cart...</div></div>;
  }

  return (
    <div className="page-section container py-5">
      <div className="section-heading mb-4">
        <p className="eyebrow mb-2">YOUR SELECTION</p>
        <h2>Shopping cart</h2>
      </div>
      
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem 
              key={item.c_id}
              pd_id={item.pd_id} 
              cartId={item.c_id}
              title={item.name} 
              text={item.description}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.total_price}
              imgsrc={item.imageurl}
              onUpdate={() => fetchCartItems()}
            />
          ))}
          <div className="cart-summary mt-4 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-warning mb-0">SubTotal: Rs.{calculateSubTotal()}</h4>
              <button 
                className="hero-button" 
                onClick={handleCheckout}
              >
                Checkout 
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-state text-center py-5">
          <h3>Your cart is clear.</h3>
          <p>Find something you love and it will appear here.</p>
          <button className="hero-button" onClick={() => navigate("/")}>Continue shopping <span>-&gt;</span></button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;