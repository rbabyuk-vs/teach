import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import backpackImage from "./assets/images/backpack.jpg"; // Local image

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const product = {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: backpackImage, // Use the local image
    description: "Ідеальний рюкзак для повсякденного використання та прогулянок у лісі. Сховайте свій ноутбук (до 15 дюймів) у м'якому рукаві, щоденний"
  };

  const addToCart = () => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      {/* Product Card */}
      <div className="card" style={{ width: "18rem" }}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="text-muted">{product.description}</p>
          <p className="card-text">
            <strong>${product.price}</strong>
          </p>
          <button className="btn btn-primary" onClick={addToCart}>
            Buy
          </button>
        </div>
      </div>

      {/* Cart Button */}
      <button
        className="btn btn-secondary mt-4"
        onClick={() => setShowCart(!showCart)}
      >
        {showCart ? "Hide Cart" : `Cart (${cart.length})`}
      </button>

      {/* Cart Sidebar */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close Button */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Cart</h5>
            <button
              className="btn-close"
              onClick={() => setShowCart(false)}
              aria-label="Close"
            ></button>
          </div>

          {/* Cart Items */}
          <div style={{ flex: 1 }}>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p className="mb-1">{item.name}</p>
                    <p className="mb-1">
                      ${item.price} x {item.quantity}
                    </p>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total and Buy Button */}
          <div>
            <h5 className="text-center mb-3">Total: ${totalPrice.toFixed(2)}</h5>
            <button
              className="btn btn-success w-100"
              onClick={() => alert("Buy functionality not implemented yet!")}
            >
              Buy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
