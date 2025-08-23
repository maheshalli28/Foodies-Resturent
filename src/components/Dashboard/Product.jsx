import React, { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Idli & Sambar",
      category: "Dinner",
      price: 35,
      status: true,
      image: "src/assets/Idli.png",
    },
    {
      id: 2,
      title: "Chicken Biriyani",
      category: "Biriyani",
      price: 135,
      status: false,
      image: "src/assets/Mutton.png",
    },
    {
      id: 3,
      title: "Pasta",
      category: "Lunch",
      price: 115,
      status: false,
      image: "src/assets/pizza.jpg",
    },
    {
      id: 4,
      title: "Omelette",
      category: "Breakfast",
      price: 99,
      status: true,
      image: "src/assets/omelette.png",
    },
    {
      id: 5,
      title: "Dosa",
      category: "Breakfast",
      price: 150,
      status: true,
      image: "src/assets/Dosa.png",
    },
    
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    status: true,
    image: "scr/assets/Aloo-Paratha.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: "",
      price: "",
      status: true,
      image: "",
    });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
        )
      );
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Products</h4>
        <button className="btn btn-danger fw-bold text-white" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="d-flex justify-content-between mb-3">
        <input type="text" placeholder="Search..." className="form-control w-50" />
        <select className="form-select w-auto">
          <option value="all">All</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

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
              <th className="text-center"> Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="rounded me-2"
                      width="50"
                      height="50"
                    />
                    <div>
                      <div className="fw-bold">{product.title}</div>
                      
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>${product.price}</td>
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
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaDeleteLeft  />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input
      type="text"
      name="title"
      className="form-control"
      value={formData.title}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Category</label>
    <input
      type="text"
      name="category"
      className="form-control"
      value={formData.category}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Price</label>
    <input
      type="number"
      name="price"
      className="form-control"
      value={formData.price}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Status</label>
    <select
      name="status"
      className="form-select"
      value={formData.status}
      onChange={(e) =>
        setFormData({ ...formData, status: e.target.value === "true" })
      }
    >
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="form-label">Image URL</label>
    <input
      type="text"
      name="image"
      className="form-control"
      value={formData.image}
      onChange={handleChange}
      placeholder="https://example.com/image.jpg"
    />
    {formData.image && (
      <div className="mt-2">
        <img
          src={formData.image}
          alt="Preview"
          className="img-thumbnail"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
    )}
  </div>
</form>

                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger text-white" onClick={handleSave}>
                    {editingProduct ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Products;
