import React from 'react';

function OrderItem(props) {
  return (
    <div
      className="card mb-3 mx-2"
      style={{ border: "2px solid yellow" }}
    >
      <div className="row">
        <div className="col-3">
          <img
            src={props.imageurl || props.imgsrc}
            className="img-fluid rounded-start"
            alt="product"
            style={{ height: "10rem", objectFit: "cover" }}
            
          />
        </div>
        <div className="col-6">
          <div className="card-body">
            <h5 className="card-title text-dark">{props.name || props.title}</h5>
            <p className="card-text text-dark">Description: {props.description || props.text}</p>
            <p className="card-price text-dark">Unit Price: Rs.{props.price}</p>
            <p className="text-dark">Quantity: {props.quantity}</p>
            <p className="text-dark">Total: Rs.{props.total_price}</p>
          </div>
        </div>
        <div className="col-3">
          <div className="card-body">
            <h6 className="text-dark">Order ID: #{props.o_id}</h6>
            <h6 className="text-dark">Status: {props.status || 'Confirmed'}</h6>
            <p className="text-dark">Payment: {props.payment_method}</p>
            <p className="text-dark">Estimated delivery: 3-5 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;