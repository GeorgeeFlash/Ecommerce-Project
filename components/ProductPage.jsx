"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import Product from '@/components/Product'
import { useStateContext } from '@/context/StateContext'


const ProductPage = ({ product, products}) => {

    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0)
    const context = useStateContext();
    const { decQty, incQty, qty, onAdd, setShowCart } = context;

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }

  return (
    <div>
        <div className='product-detail-container'>
            <div className="">
                <div className='image-container'>
                    <Image 
                        src={image && image[index].url}
                        width={350}
                        height={350}
                        priority={true}
                        className='product-detail-image'
                        alt='product'
                    />
                </div>
                <div className="small-images-container">
                    {image?.map((image, i) => (
                            <Image 
                                key={image.id}
                                src={image.url}
                                width={150}
                                height={150}
                                className={i === index ?
                                'small-image selected-image' :
                                'small-image'}
                                alt='image-carousel'
                                onMouseEnter={() => setIndex(i)}
                            />
                        )
                    )}
                    
                </div>
            </div>
            
            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className="price">${price}</p>
                <div className="quantity">
                    <h3>Quantity:</h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decQty}>
                            <AiOutlineMinus />
                        </span>
                        <span className="num">{qty}</span>
                        <span className="plus" onClick={incQty}>
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className="buttons">
                    <button 
                        type="button" 
                        className='add-to-cart'
                        onClick={() => onAdd(product, qty)}    
                    >
                        Add to Cart
                    </button>
                    <button 
                        type="button" 
                        className='buy-now'
                        onClick={handleBuyNow}    
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage