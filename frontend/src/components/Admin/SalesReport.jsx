import React from 'react';

function SalesReport() {
  return (
    <div className="m-4">
      <h3 className="mb-4">Sales Report</h3>

      
      <ul className="list-group list-group-horizontal fw-bold bg-dark text-white mb-2">
        <li className="list-group-item flex-fill bg-dark text-white border-0">Date</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0 mx-5">Product</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0">qunatity</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0">amount</li>
      </ul>

      <ul className="list-group list-group-horizontal mb-2">
        <li className="list-group-item flex-fill">2025-06-01</li>
        <li className="list-group-item flex-fill">Laptop</li>
        <li className="list-group-item flex-fill">5</li>
        <li className="list-group-item flex-fill">5000</li>
      </ul>

      <ul className="list-group list-group-horizontal mb-2">
        <li className="list-group-item flex-fill">2025-06-01</li>
        <li className="list-group-item flex-fill">Mouse</li>
        <li className="list-group-item flex-fill">10</li>
        <li className="list-group-item flex-fill">500</li>
      </ul>

      <ul className="list-group list-group-horizontal mb-2">
        <li className="list-group-item flex-fill">2025-06-02</li>
        <li className="list-group-item flex-fill">Keyboard</li>
        <li className="list-group-item flex-fill">3</li>
        <li className="list-group-item flex-fill">300</li>
      </ul>
      <ul className="list-group list-group-horizontal mb-2">
        <li className="list-group-item flex-fill">2025-06-02</li>
        <li className="list-group-item flex-fill">Keyboard</li>
        <li className="list-group-item flex-fill">3</li>
        <li className="list-group-item flex-fill">300</li>
      </ul>
      <ul className="list-group list-group-horizontal mb-2">
        <li className="list-group-item flex-fill">2025-06-02</li>
        <li className="list-group-item flex-fill">Keyboard</li>
        <li className="list-group-item flex-fill">3</li>
        <li className="list-group-item flex-fill">300</li>
      </ul>
    </div>
  );
}

export default SalesReport;
