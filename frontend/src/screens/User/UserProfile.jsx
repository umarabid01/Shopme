import React from 'react'
import ProfileCard from '../../components/User/ProfileCard'
import { getCurrentUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  if (!user) {
    return <div className="page-section container py-5"><div className="account-panel"><h2>Sign in to view your profile.</h2><button className="hero-button" onClick={() => navigate("/login")}>Sign in</button></div></div>;
  }

  return (
    <div className="page-section container py-5">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h2>Profile</h2>
    <ProfileCard Name={`${user.first_name} ${user.last_name || ""}`} Contact={user.city} Email={user.email} Address={user.address} imgsrc={user.photo || "/img/boy.png"} />
    </div>
    
  )
}

export default UserProfile