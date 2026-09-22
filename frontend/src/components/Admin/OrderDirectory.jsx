import React, { useEffect, useState } from 'react';

function OrderDirectory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/aorders`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-content"><div className="admin-loading">Loading orders...</div></div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-page-heading"><div><p className="admin-kicker">FULFILLMENT</p><h1>Order directory</h1><p>Orders placed by customers in the storefront.</p></div></div>
      <ul className="list-group list-group-horizontal fw-bold admin-table-heading mb-2">
        <li className="list-group-item flex-fill">Order</li>
        <li className="list-group-item flex-fill">Customer</li>
        <li className="list-group-item flex-fill">Product</li>
        <li className="list-group-item flex-fill">Quantity</li>
        <li className="list-group-item flex-fill">Total</li>
        <li className="list-group-item flex-fill">Payment</li>
      </ul>
      {orders.length > 0 ? orders.map((order) => (
        <ul key={`${order.o_id}-${order.pd_id}`} className="list-group list-group-horizontal admin-table-row mb-2">
          <li className="list-group-item flex-fill">#{order.o_id}</li>
          <li className="list-group-item flex-fill">{order.first_name} {order.last_name}</li>
          <li className="list-group-item flex-fill">{order.product_name}</li>
          <li className="list-group-item flex-fill">{order.quantity}</li>
          <li className="list-group-item flex-fill">Rs.{order.total_price}</li>
          <li className="list-group-item flex-fill">{order.payment_method}</li>
        </ul>
      )) : <div className="admin-empty">No customer orders found.</div>}
    </div>
  );
}

export default OrderDirectory;