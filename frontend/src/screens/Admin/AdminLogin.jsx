import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/Admin/AdminHeader'
import AdminFooter from '../../components/Admin/AdminFooter'
import { getCurrentAdmin, saveCurrentAdmin } from '../../utils/auth';

function AdminLogin() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getCurrentAdmin()) {
      navigate("/ahome", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/alogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        saveCurrentAdmin(data.admin);
        alert("Login successful!");
        navigate("/ahome", { replace: true });
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="admin-shell d-flex flex-column min-vh-100">
      <AdminHeader/>
    <main className="flex-grow-1 my-4">
        
        
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
            Admin Sign in
          </button>
        </form>
        
      </main>
      <AdminFooter/>
    </div>
  );
}

export default AdminLogin;