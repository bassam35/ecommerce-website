import { createContext, useContext, useState } from "react";

// CONTEXT
const CartContext = createContext();

// DATA
import { getProductById } from "../data/products";

export default function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState([]);

    // ADD PRODUCT TO CART
    function addToCart(productID) {
        const exsitingItem = cartItems.find((item) => item.id === productID);

        if (exsitingItem) {
            const updateCartItems = cartItems.map((item) => item.id === productID ? { id: productID, quantity: exsitingItem.quantity + 1 } : item); // thid will be if item is existing
            setCartItems(updateCartItems);
        } else {
            setCartItems([...cartItems, { id: productID, quantity: 1 }]); // this will be for the first time
        }
    }

    // GET PRODUCT IN CART
    function getCartItemsWithProducts() {
        return cartItems.map((item) => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product)
    }

    // REMOVE ITEM FROM CART
    function removeFromCart(productID) {
        setCartItems(cartItems.filter((item) => item.id !== productID));
    }

    // INCREASE OR DECREASE QUANTITY OF PRODUCT
    function updateQuantity(productID, quantity) {
        if (quantity <= 0) {
            removeFromCart(productID);
            return;
        }

        setCartItems(cartItems.map((item) => item.id === productID ? { ...item, quantity } : item));
    }

    // CALCULATE TOTAL CHECKOUT
    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0) // accumelator intital value for total 

        return total;
    }

    // RESET CARTITEMS
    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart }}>{children}</CartContext.Provider>
    )
}

// CUSTOM HOOK 
export function useCart() {
    const context = useContext(CartContext);

    return context;
}