import React, { useEffect, useState } from 'react';

function ProductDirectory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/aallproducts`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          alert("Failed to load products");
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Error: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="admin-content"><div className="admin-loading">Loading products...</div></div>;
  }

  return (
    <div className="admin-content">
      <div className="admin-page-heading">
        <div><p className="admin-kicker">CATALOG</p><h1>Product directory</h1><p>Review pricing, stock, and category information.</p></div>
      </div>
      
     
      <ul className="list-group list-group-horizontal fw-bold admin-table-heading mb-2">
        <li className="list-group-item flex-fill bg-dark text-white border-0 col-1">ID</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0 col-2">Name</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0 col-1">Stock</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0 col-1">Price</li>
        <li className="list-group-item flex-fill bg-dark text-white border-0 col-2">Category</li>
      </ul>

   
      {products.length > 0 ? (
        products.map((product) => (
          <ul key={product.pd_id} className="list-group list-group-horizontal admin-table-row mb-2">
            <li className="list-group-item flex-fill col-1">{product.pd_id}</li>
            <li className="list-group-item flex-fill col-2">{product.name}</li>
            <li className="list-group-item flex-fill col-1">{product.stock}</li>
            <li className="list-group-item flex-fill col-1">Rs.{product.price}</li>
            <li className="list-group-item flex-fill col-2">{product.category}</li>
          </ul>
        ))
      ) : (
        <div className="text-white">No products found</div>
      )}
    </div>
  );
}

export default ProductDirectory;