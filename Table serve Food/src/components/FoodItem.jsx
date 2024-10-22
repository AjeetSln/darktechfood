// src/components/FoodItem.js
import React, { useState } from 'react';

const FoodItem = ({ item, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);
    const [inCart, setInCart] = useState(false);  // Track if item is added to the cart

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        onAddToCart(item, quantity + 1);  // Update the cart with the new quantity
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            onAddToCart(item, quantity - 1);  // Update the cart with the new quantity
        } else {
            setQuantity(0);
            setInCart(false);  // Remove item from cart
            onAddToCart(item, 0);  // Update the cart to remove the item
        }
    };

    const handleAddToCartClick = () => {
        setInCart(true);
        setQuantity(1);  // Set initial quantity to 1 when added to cart
        onAddToCart(item, 1);
    };

    return (
        <div className="food-item">
            <img src={item.image} alt={item.name} width="100" />
            <h2>{item.name}</h2>
            <h4>Price: ${item.price}</h4>
            <p>Description: {item.description}</p>
            <p className='category'>Category: {item.category}</p>

            {!inCart ? (
                <button onClick={handleAddToCartClick} className="add-to-cart-button">
                    Add to Cart
                </button>
            ) : (
                <div className="cart-controls">
                    <button onClick={decrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                </div>
            )}
        </div>
    );
};

export default FoodItem;
