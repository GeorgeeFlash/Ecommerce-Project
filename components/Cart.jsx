"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '@/context/StateContext'
import getStripe from '@/lib/getStripe'

const Cart = () => {

  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();

      if(!stripe) throw new Error('Stripe failed to initialize.');

      const chechoutResponse = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      if(chechoutResponse.statusCode === 500) return;

      const { sessionId } = await chechoutResponse.json();

      toast.loading('Redirecting...')

      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.log("Stripe Error:", stripeError);
      }
    }
    catch (error) {
      console.log("Fetch Error:",error)
    }
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button type="button"
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type="button"
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {console.log("Cart CartItems:", cartItems)}
          {cartItems.length >= 1 && cartItems?.map((item) => (
            <div className="product" key={item._id}>
              <Image 
                src={item?.image[0]?.url}
                width={150}
                height={150}
                className="cart-product-image"
                alt="cart-product"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item?.name}</h5>
                  <h4>${item?.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                            <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                  </div>
                  <button type="button" className="remove-item"
                    onClick={() => onRemove(item)}  
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn"
                onClick={handleCheckout}
              >
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart