import "./style.component.css";
import React, { useState, useEffect } from "react"; 
import flagsmith from 'flagsmith';

export default function Products() {
  const [products, setProducts] = useState([]);

  const [showProductRating, setShowProductRating] = useState(false);

  const environmentID = import.meta.env.VITE_REACT_APP_FLAGSMITH_ENVIRONMENT_ID;


  useEffect(() => {

    const fetchProducts = async () => {

        await fetch("https://dummyjson.com/products")
          .then((res) => res.json())
          .then((json) => setProducts(json.products)); 

        }

    fetchProducts();

    flagsmith.init({
      environmentID:environmentID,
      cacheFlags: true,
      enableAnalytics: true,
      onChange: (oldFlags, params) => {
        setShowProductRating(flagsmith.hasFeature('product_rating'));
      }
    });
  }, []);

 
  return (
    <> 
      <div className="product-catalogue">
        <div className="product-list">

          {products.slice(0,6).map((product) => (
            <div className="product" key={product.id}>
              <h2>{product.title}</h2> 
              <p>Price: ${product.price}</p>
              <p> {product.description}</p>
              {/* <h3> Rating: {product.rating}</h3> */}
 
              {showProductRating && <h3> Rating: {product.rating}</h3>}

            </div>
          ))}
        </div>
      </div>
    </>
  );
}


