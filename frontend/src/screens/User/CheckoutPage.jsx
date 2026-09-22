import React from 'react'
import CheckoutSummary from '../../components/User/CheckoutSummary'
import { getCurrentUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const navigate = useNavigate();
  if (!getCurrentUser()) {
    return <div className="page-section container py-5"><div className="account-panel"><h2>Sign in before checkout.</h2><button className="hero-button" onClick={() => navigate("/login")}>Sign in</button></div></div>;
  }

  return (
    <div>
        <CheckoutSummary/>
    </div>
  )
}

export default CheckoutPage