import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/User/ProductCard";

function StorefrontHome() {
  
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const search = location.state?.search?.trim().toLowerCase() || "";
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Failed to load products");
      }
     
    } catch (err) {
      console.error("Error fetching products:", err);
  
    }
  };

 

  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search)
  );

  return (
    <div className="store-home">
      <section className="hero-section">
        <div className="container py-5">
          <div className="hero-copy">
            <p className="eyebrow">THE WEEKEND EDIT</p>
            <h1>Good things,<br /><em>well chosen.</em></h1>
            <p className="hero-text">Discover useful pieces for your home, your routine, and the moments in between.</p>
            <button className="hero-button" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Shop the collection <span>-&gt;</span></button>
          </div>
          <div className="hero-visual" aria-label="Featured products">
            {products.slice(0, 3).map((product, index) => (
              <button
                className={`hero-product hero-product-${index + 1}`}
                key={product.pd_id}
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                aria-label={`View ${product.name}`}
              >
                <img src={product.imageurl} alt={product.name} />
                <span>{product.name}</span>
              </button>
            ))}
            {products.length === 0 && <div className="hero-shape" />}
            {/* <div className="hero-note">Curated daily<br /><strong>01 / 04</strong></div> */}
          </div>
        </div>
      </section>
      <div className="category-rail">
        <div className="container d-flex flex-wrap justify-content-between gap-3">
          <span>Fresh arrivals</span><span>Home essentials</span><span>Daily rituals</span><span>Gift ideas</span>
        </div>
      </div>
      <section className="product-section container py-5" id="products">
        <div className="section-heading d-flex justify-content-between align-items-end mb-4">
          <div><p className="eyebrow mb-2">JUST IN</p><h2>Made for your everyday</h2></div>
          <span className="product-count">{visibleProducts.length} products</span>
        </div>
        <div className="row g-4">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <div key={product.pd_id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard 
                  pd_id={parseInt(product.pd_id)}
                  title={product.name} 
                  text={product.description} 
                  price={`Price: Rs.${product.price}`}
                  numericPrice={parseInt(product.price)}
                  imgsrc={product.imageurl} 
                />
              </div>
            ))
          ) : (
            <div className="empty-state col-12 text-center">
              <h3>{search ? "No matches yet" : "The collection is waiting for you"}</h3>
              <p>{search ? "Try a different search term." : "Please add some products to the database."}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StorefrontHome;