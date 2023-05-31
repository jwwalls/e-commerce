import React, { useState } from 'react';
import { createProduct } from '../api/products';
import '../css/Update.css'

const CreatePost = ({ token, onClose }) => {
  const [name, setName] = useState('');
  const [shoeFeatures, setShoeFeatures] = useState('');
  const [materialQuality, setMaterialQuality] = useState('');
  const [accessories, setAccessories] = useState('');
  const [sizes, setSizes] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productId = await createProduct(name, shoeFeatures, materialQuality, sizes, accessories, price, category, imagePath, token);
      onClose();
      console.log('Product created with ID:', productId);
    } catch (error) {
      console.error('Failed to create product:', error.message);
    }
  };

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImagePath(URL.createObjectURL(file));
  };

  const handleSizesChange = (event) => {
    const selectedSizes = Array.from(event.target.selectedOptions, (option) => option.value);
    const filteredSizes = selectedSizes.filter((size) => [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(Number(size)));
    setSizes(filteredSizes);
  };

//................................................................

return (
  
  <form className='updateForm' onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </label>
    <br />
    <label>
      Shoe Features:
      <input type="text" value={shoeFeatures} onChange={(e) => setShoeFeatures(e.target.value)} />
    </label>
    <br />

    <label>
      Material Quality:
      <input type="text" value={materialQuality} onChange={(e) => setMaterialQuality(e.target.value)} />
    </label>
    <br />

    <label>
    Accessories:
      <input type="text" value={accessories} onChange={(e) => setAccessories(e.target.value)} />
    </label>
    <br />

   <label>Shoe Size:</label>
         <select
          className="updateDescription"
          value={sizes}
          onChange={handleSizesChange}
          multiple
          required
        >
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
        </select>
    <br />

    <label>Price:</label>
         <div>
           $
           <input
             type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
          </div>
    <br />

    <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="man">Man</option>
          <option value="women">Women</option>
        </select>
    <br />

    <label>
      Image Path:
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </label>
    <br />
    
    <button type="submit">Create Post</button>
  </form>
);
}

export async function CreatePost(name, shoeFeatures, materialQuality, sizesAccessories, price, category, imagePath, token) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        shoeFeatures,
        materialQuality,
        sizes,
        accessories,
        price,
        category,
        imagePath,
      }),
    });

    const data = await response.json();
    return data.productId;
  } catch (error) {
    console.error(error.message || "Failed to create product");
    throw error;
  }
}