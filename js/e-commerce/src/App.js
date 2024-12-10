import React, { useState } from "react";
import backpackImage from "./assets/images/backpack.jpg"; // Local image
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Drawer,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const product = {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: backpackImage,
    description:
      "Ідеальний рюкзак для повсякденного використання та прогулянок у лісі. Сховайте свій ноутбук (до 15 дюймів) у м'якому рукаві, щоденний",
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
    <Box sx={{ padding: 2 }}>
      {/* Product Card */}
      <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {product.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Typography variant="h6">${product.price}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addToCart}
            >
              Buy
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Cart Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowCart(true)}
      >
        Cart ({cart.length})
      </Button>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
        <Box
          sx={{
            width: 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Cart</Typography>
            <IconButton onClick={() => setShowCart(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Cart Items */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {cart.length === 0 ? (
              <Typography>Your cart is empty.</Typography>
            ) : (
              cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 50,
                      height: 50,
                      marginRight: 10,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography>{item.name}</Typography>
                    <Typography>
                      ${item.price} x {item.quantity}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Total and Buy Button */}
          <Box>
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => alert("Buy functionality not implemented yet!")}
            >
              Buy
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default App;