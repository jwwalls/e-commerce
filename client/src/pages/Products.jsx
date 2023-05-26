import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {getProducts} from '../api/products';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const location = useLocation();
  const category = location.pathname.split("/")[2]; // Get category from URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const filteredProducts = allProducts.filter(product => product.category === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error.message || 'Failed to retrieve products');
      }
    };

    fetchProducts();
  }, [category]);  // add category as a dependency

  // Get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      {currentProducts.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={product.image_url} alt={product.name} />
          <button>ADD TO CART</button>
        </div>
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(products.length / productsPerPage))].map((e, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default Products;