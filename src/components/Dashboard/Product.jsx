import React, { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl, API_ENDPOINTS, currentConfig } from "../../config/api";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    status: "true",
    image: null,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(getApiUrl(API_ENDPOINTS.PRODUCTS.LIST));
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("status", formData.status);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingProduct) {
        await axios.put(getApiUrl(API_ENDPOINTS.PRODUCTS.UPDATE(editingProduct._id)), data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product updated!");
      } else {
        // Add new
        await axios.post(getApiUrl(API_ENDPOINTS.PRODUCTS.CREATE), data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Product added!");
      }

      setFormData({ title: "", category: "", price: "", status: "true", image: null });
      setShowForm(false);
      setEditingProduct(null);
      fetchProducts(); // refresh
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      status: product.status ? "true" : "false",
      image: null,
    });
    setShowForm(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(getApiUrl(API_ENDPOINTS.PRODUCTS.DELETE(id)));
      alert("🗑️ Product deleted");
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Products</h4>
        <button
          className="btn btn-danger fw-bold text-white"
          onClick={() => {
            setShowForm(!showForm);
            setEditingProduct(null);
            setFormData({ title: "", category: "", price: "", status: "true", image: null });
          }}
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-3 mb-4 bg-light rounded shadow-sm"
        >
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
          <label className="form-label">Category</label>
              <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="true">Available</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>

          <button type="submit" className="btn btn-danger text-white">
            {editingProduct ? "Update" : "Add"} Product
          </button>
        </form>
      )}

      {/* Products Table */}
      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
              <th className="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="d-flex align-items-center">
                    {product.image && (
                      <img
                        src={product.image.startsWith('http') ? product.image : `${currentConfig.baseURL}${product.image}`}
                        alt={product.title}
                        className="rounded me-2"
                        width="50"
                        height="50"
                      />
                    )}
                    <div>
                      <div className="fw-bold">{product.title}</div>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>
                  {product.status ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => handleEdit(product)}
                  >
                    <CiEdit size={20} />
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaDeleteLeft />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
