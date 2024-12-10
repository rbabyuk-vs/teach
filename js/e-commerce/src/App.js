import React, { useState } from "react";
import backpackImage from "./assets/images/backpack.jpg"; // Local image

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const product = {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: backpackImage, // Use the local image
    description: "Ідеальний рюкзак для повсякденного використання та прогулянок у лісі. Сховайте свій ноутбук (до 15 дюймів) у м'якому рукаві, щоденний",
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

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* Product Card */}
      <div style={{ border: "1px solid #ccc", padding: "10px", width: "300px" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "auto" }}
        />
        <div>
          <h5>{product.name}</h5>
          <p>{product.description}</p>
          <p>
            <strong>${product.price}</strong>
          </p>
          <button onClick={addToCart}>Buy</button>
        </div>
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ccc",
          border: "none",
        }}
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
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
            <h5>Cart</h5>
            <button onClick={() => setShowCart(false)}>X</button>
          </div>

          {/* Cart Items */}
          <div style={{ flex: 1 }}>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
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
                    <p>{item.name}</p>
                    <p>
                      ${item.price} x {item.quantity}
                    </p>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Total and Buy Button */}
          <div>
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                width: "100%",
              }}
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
