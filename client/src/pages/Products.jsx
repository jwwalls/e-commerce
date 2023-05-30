import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../api/products';
import { addToCart } from '../api/cart';
import { Link } from 'react-router-dom';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [userId, setUserId] = useState('');

  const location = useLocation();
  const category = location.pathname.split("/")[2];

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

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    fetchProducts();
  }, [category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAddToCart = (productId, quantity, imageUrl, price) => {
    console.log(productId, quantity,imageUrl,price);
    addToCart(userId, productId, quantity, imageUrl, price)
    
  };

  return (
    <div className="products-container">
      {currentProducts.map((product) => (
        <div key={product.id} className="product-card">
          <button className="add-to-cart-button" onClick={() => handleAddToCart(product.id, 1, product.image_url, product.price)}>+</button>
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <img src={product.image_url} alt={product.name} />

          <button className="more-detail-btn">
            <Link to={`/products/${product.id}`}>More Detail</Link>
          </button>
        </div>
      ))}
      <div className="pagination">
        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default Products;
