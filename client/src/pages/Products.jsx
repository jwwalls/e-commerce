import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { getProducts } from '../api/products';
import { addToCart } from '../api/cart';
import { Link } from 'react-router-dom';
import '../css/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [userId, setUserId] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const images = ["homepic.png", "homepic2.png", "homepic3.png", "homepic4.png"];

  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAddToCart = (productId, quantity, imageUrl, price) => {
    console.log(productId, quantity, imageUrl, price);
    addToCart(userId, productId, quantity, imageUrl, price);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className='header'>
        <div className='header-image-container'>
          {images.map((image, index) => (
            <img
              className={`header-image ${index === currentImageIndex ? "show" : ""}`}
              src={`/pics/${image}`}
              alt="homepic"
              key={index}
              style={index === previousImageIndex ? { opacity: 0 } : {}} />
          ))}
        </div>
      </div>
      <div className="products-container">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
            <div className="price-badge">${product.price}</div>
            <button className="add-to-cart-button" onClick={(e) => {
              e.stopPropagation(); 
              handleAddToCart(product.id, 1, product.image_url, product.price)
            }}>
              ADD TO CART 
            </button>
            <img src={product.image_url} alt={product.name} />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(products.length / productsPerPage))].map((_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </>
  );
}

export default Products;