"use client"

import React, { createContext, useContext, useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    
    useEffect(() => {
        const fetchedCart = () => {
            const cartInfo = localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : [];

            console.log("CartInfo:", cartInfo)

            return cartInfo;
        }

        const newCart = fetchedCart();
        let newTotalPrice = 0;
        let newTotalQuantities = 0;

        if(newCart.length >= 1) {
            newCart.forEach(cartProduct => {
                newTotalPrice += cartProduct.price;
                newTotalQuantities += cartProduct.quantity;
            });
        }

        setCartItems(newCart);
        setTotalPrice(newTotalPrice * newTotalQuantities);
        setTotalQuantities(newTotalQuantities);
    }, [])

    useEffect(() => {
        const saveCart = (cart) => {
            console.log("CartInSave:", cart)
            // localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(cart))
        }

        saveCart(cartItems)
    }, [cartItems])
    


    let foundProduct;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        if(checkProductInCart) {
            
            return toast.success(`${product.name} already in cart`);
        } else {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
            product.quantity = quantity
            
            setCartItems([...cartItems, { ...product }])
        }
        
        // setQty(1)
        // console.log("OnAdd Cart:", cartItems);
        // saveCart(cartItems);
        toast.success(`${qty} ${product.name} added to cart.`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item) => item._id !== product._id )

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)

        // saveCart(cartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        // index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = [...cartItems];
        // const newCartItems = cartItems.filter((item) => item._id !== id )

        if(value === 'inc') {
            // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1}])

            const addCart = newCartItems.map((item) => {
                if(item._id === id) {
                    item.quantity += 1
                }

                return {...item}
            })
            setCartItems(addCart)
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1}])
                const decCart = newCartItems.map((item) => {
                    if(item._id === id) {
                        item.quantity -= 1
                    }
    
                    return {...item}
                })

                setCartItems(decCart)
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }

        // saveCart(cartItems);
    }

    // saveCart(cartItems)

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1
        })
    }

    const providerValue = useMemo(() => (
        {
            showCart,
            setShowCart,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            setQty,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
        }
    ), [
            showCart,
            setShowCart,
            setCartItems,
            setTotalQuantities,
            setTotalPrice,
            setQty,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
        ]
    )
    
    return (
        <Context.Provider
            value={providerValue}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)