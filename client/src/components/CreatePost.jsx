import React, { useState } from 'react';

const CreatePost = ({ token, onClose }) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice ] = useState("");
  const [category, setCategory ] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isPublic, setIsPublic] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSizesChange = (event) => {
    const selectedSizes = Array.from(event.target.selectedOptions, (option) => option.value);
    const filteredSizes = selectedSizes.filter((size) => [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].includes(Number(size)));
    setSizes(filteredSizes);
  };

return (
  <div className="update-post">
    <div className="updateHeader">
      <h2>Add Shoe</h2>
      <div className="close-button" onClick={onClose}>
        X
      </div>
    </div>
    <form className='updateForm'
      onSubmit={async (e) => {
        e.preventDefault();
        await createRoutine(token, name, goal, isPublic);
        onClose(false);
        navigate("/routines");
      }}
    >

      <input 
      type="file"
      accept="image/*"
      onChange={handleImageUpload} 
      required
      />

      <label>Shoe Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
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

        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          <option value="man">Man</option>
          <option value="women">Women</option>
          <option value="child">Child</option>
          <option value="casual">Casual</option>
          <option value="sports">Sports</option>
          <option value="winter">Winter</option>
        </select>

      <label>
        Public:
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </label>

      <button type="submit">Create Post</button>
    </form>
  </div>
);
};

export default CreatePost