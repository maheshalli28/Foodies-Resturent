import React, { useState } from "react";
import axios from "axios";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "Available",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prepare form-data for API
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("status", formData.status);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await axios.post(getApiUrl(API_ENDPOINTS.PRODUCTS.CREATE), data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "Available",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>

        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
