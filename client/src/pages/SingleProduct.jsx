import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getProductById} from '../api/products';
import '../css/SingleProduct.css';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('7');

  // Define an array of shoe sizes
  const shoeSizes = [];
  for (let i = 7; i <= 13; i += 0.5) {
    shoeSizes.push(i.toString());
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        
        // 打印整个产品对象
        console.log('Product data:', product);
  
        // 分别打印特性字段
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

  // Handler function for the select element
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  if (!product) return null;

  return (
    <div className="single-product">
      <div className="product-image">
        <h1>{product.name}</h1>
        <img src={product.image_url} alt={product.name} />
        <label htmlFor="size-selector">Size:</label>
        <select id="size-selector" value={selectedSize} onChange={handleSizeChange}>
          {shoeSizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
        <button onClick={() => addToCart(product, selectedSize)}>Add to Cart</button>
      </div>
      <div className="product-details">
  <p>Features: {product.shoefeatures}</p>
  <p>Material Quality: {product.materialquality}</p>
  <p>Sizes and Accessories: {product.sizesaccessories}</p>
  <p>Price: {product.price}</p>
</div>
    </div>
  );
}
const addToCart = (product, size) => {
  // ...your code to add the product to the cart...
};

export default SingleProduct;