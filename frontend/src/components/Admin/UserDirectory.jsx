import React, { useEffect, useState } from 'react';

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auser`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-content"><div className="admin-loading">Loading customers...</div></div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-page-heading">
        <div>
          <p className="admin-kicker">CUSTOMERS</p>
          <h1>Customer directory</h1>
          <p>View account and delivery details for registered customers.</p>
        </div>
      </div>
      <ul className="list-group list-group-horizontal fw-bold admin-table-heading mb-2">
        <li className="list-group-item flex-fill">ID</li>
        <li className="list-group-item flex-fill">Name</li>
        <li className="list-group-item flex-fill">Email</li>
        <li className="list-group-item flex-fill">Address</li>
        <li className="list-group-item flex-fill">City</li>
      </ul>
      {users.length > 0 ? users.map((user) => (
        <ul key={user.pf_id} className="list-group list-group-horizontal admin-table-row mb-2">
          <li className="list-group-item flex-fill">{user.pf_id}</li>
          <li className="list-group-item flex-fill">{user.first_name} {user.last_name}</li>
          <li className="list-group-item flex-fill">{user.email}</li>
          <li className="list-group-item flex-fill">{user.address}</li>
          <li className="list-group-item flex-fill">{user.city}</li>
        </ul>
      )) : <div className="admin-empty">No customers found.</div>}
    </div>
  );
}

export default UserDirectory;
