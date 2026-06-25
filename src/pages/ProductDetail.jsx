// REACT
import { useEffect, useState } from 'react';

// REACT ROUTER DOM
import { useParams, useNavigate } from "react-router-dom";

// DATA
import { getProductById } from '../data/products';

// CONTEXT
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, addToCart } = useCart();
    const [product, setProduct] = useState(null);


    // GET DATA BY ID
    useEffect(() => {
        const foundtProduct = getProductById(id);

        // check of there are data
        if (!foundtProduct) {
            navigate('/');
            return;
        }

        setProduct(foundtProduct);
    }, [id]);

    if (!product) {
        return <div>Loading...</div>
    }

    // GET ITEM QUANTITY
    const productInCart = cartItems.find((item) => item.id === product.id);

    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className="product-detail-name">{product.name}</h1>
                        <p className="product-detail-price">${product.price}</p>
                        <p className="product-detail-description">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Add to cart {productInCart ? (`(${productInCart.quantity})`) : ""}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;