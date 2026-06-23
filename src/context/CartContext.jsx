import { createContext, useContext, useState } from "react";

// CONTEXT
const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    function addToCart(productID) {
        const exsitingItem = cartItems.find((item) => item.id === productID);

        if (exsitingItem) {
            const updateCartItems = cartItems.map((item) => item.id === productID ? { id: productID, quantity: exsitingItem.quantity+ 1 } : item); // thid will be if item is existing
            setCartItems(updateCartItems);
        } else {
            setCartItems([...cartItems, { id: productID, quantity: 1 }]); // this will be for the first time
        }
    }


    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>{children}</CartContext.Provider>
    )
}

// CUSTOM HOOK 
export function useCart() {
    const context = useContext(CartContext);

    return context;
}