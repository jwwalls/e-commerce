import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getProductById} from '../api/products';
import '../css/SingleProduct.css';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('7');

  const shoeSizes = [];
  for (let i = 7; i <= 13; i += 0.5) {
    shoeSizes.push(i.toString());
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        

        console.log('Product data:', product);
  
  
        console.log('shoeFeatures:', product.shoefeatures);
        console.log('materialQuality:', product.materialquality);
        console.log('sizesAccessories:', product.sizesaccessories);
        
        setProduct(product);
      } catch (error) {
        console.error(error.message || 'Failed to retrieve product');
      }
    };
  
    fetchProduct();
  }, [id]);
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (!product) return null;

  return (
    <div className="single-product-page">
    <div className="single-product-container">
      <div className="product-image-container">
        <img className="product-image2" src={product.image_url} alt={product.name} />
        <label htmlFor="size-selector">Size:</label>
        <select className="size-selector" id="size-selector" value={selectedSize} onChange={handleSizeChange}>
          {shoeSizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="product-details-container">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-feature">Features: {product.shoefeatures}</p>
        <p className="product-quality">Material Quality: {product.materialquality}</p>
        <p className="product-sizes">Sizes and Accessories: {product.sizesaccessories}</p>
        <p className="product-price">Price: {product.price}</p>
        <button className="cart-button" onClick={() => addToCart(product, selectedSize)}>Add to Cart</button>
      </div>
    </div>
    </div>
  );
}
const addToCart = (product, size) => {

};

export default SingleProduct;