import React, { useEffect, useState } from 'react';
import {getProducts} from '../api/products'

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error(error.message || 'Failed to retrieve products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
