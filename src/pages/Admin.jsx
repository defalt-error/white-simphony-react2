import React, { useState } from "react";
import {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../data/products";

export default function Admin() {
  const [products, setProducts] = useState(listProducts());
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    offer: false,
  });

  const handleAdd = (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Completa todos los campos");
      return;
    }

    createProduct({
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    });

    setProducts(listProducts());
    setNewProduct({ name: "", price: "", category: "", stock: "", offer: false });
    alert("Producto agregado correctamente ✅");
  };

  const handleDelete = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      deleteProduct(id);
      setProducts(listProducts());
    }
  };

  const toggleOffer = (id) => {
    const prod = products.find((p) => p.id === id);
    updateProduct(id, { offer: !prod.offer });
    setProducts(listProducts());
  };

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-4"
        style={{ color: "#FFD700", fontWeight: "bold", letterSpacing: "1px" }}
      >
        Panel de Administración
      </h2>

      {/* 🔸 Formulario de agregar producto */}
      <form
        className="row g-3 p-4 rounded-4 shadow-lg mb-5"
        style={{ backgroundColor: "#111", color: "white" }}
        onSubmit={handleAdd}
      >
        <h5 className="mb-3 text-warning fw-semibold">Agregar nuevo producto</h5>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Precio"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Categoría"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-warning w-100 fw-bold">Agregar</button>
        </div>
      </form>

      {/* 🔸 Tabla de productos */}
      <div
        className="table-responsive p-3 rounded-4 shadow-lg"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <h5 className="text-warning fw-semibold mb-3">Inventario actual</h5>
        <table className="table table-dark table-striped table-hover align-middle text-center rounded-4 overflow-hidden">
          <thead style={{ backgroundColor: "#2c2c2c", color: "#FFD700" }}>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={p.offer}
                    onChange={() => toggleOffer(p.id)}
                    style={{ transform: "scale(1.2)" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
