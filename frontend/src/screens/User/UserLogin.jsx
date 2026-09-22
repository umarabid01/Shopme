import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, saveCurrentUser, clearCurrentUser } from "../../utils/auth";

function UserLogin()
{
  const navigate=useNavigate();
  const location = useLocation();

  const[email,setEmail]= useState("");
  const[password,setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(getCurrentUser);


  const handleSubmit =async(e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);

    try
    {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), });

  const data = await res.json();
    console.log("Server response:", data);

      if (data.success && data.user) {
        saveCurrentUser(data.user);
        setCurrentUser(data.user);
        alert("Login successful!");
        navigate("/", { replace: true });
      } else {
        alert(data.message || "Login failed: no user details were returned");
      }
    }
    catch(error)
    {
    console.error("Login error:", error);
    alert(error.message || "Unable to log in");
    }
  };

  const handleLogout = () => {
    clearCurrentUser();
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="page-section container py-5">
        <div className="account-panel">
          <p className="eyebrow">SIGNED IN</p>
          <h2>Welcome back, {currentUser.first_name}.</h2>
          <p>{currentUser.email}</p>
          <button className="hero-button" onClick={() => navigate("/profile")}>View profile</button>
          <button className="account-secondary-button" onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white py-5">
      {location.state?.message && <div className="account-notice mx-5 mb-4">{location.state.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3 mx-5">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-4">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3 mx-5">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-4">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mx-5">
          Sign in
        </button>
        <button
          type="button"
          className="btn btn-primary mx-5"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
