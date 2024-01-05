"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Product from '@/components/Product'
import { imageProps } from '@/sanity/lib/image'


const ProductPage = ({ product: { image, name, details, price }, products}) => {

    const [index, setIndex] = useState(0)

    const imgProps = imageProps(image && image[index])

  return (
    <div>
        <div className='product-detail-container'>
            <div className="">
                <div className='image-container'>
                    <Image 
                        {...imgProps}
                        width={350}
                        height={350}
                        className='product-detail-image'
                    />
                </div>
                <div className="small-images-container">
                    {image?.map((item, i) => {
                        // creating new image props for the loop
                        let props = imageProps(item)

                        return (
                            <Image 
                                {...props}
                                className={i === index ?
                                'small-image selected-image' :
                                'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        )
                    })}
                    
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
                        <span className='minus' onClick=''>
                            <AiOutlineMinus />
                        </span>
                        <span className="num">0</span>
                        <span className="plus">
                            <AiOutlinePlus />
                        </span>
                    </p>
                </div>
                <div className="buttons">
                    <button 
                        type="button" 
                        className='add-to-cart'
                        onClick=''    
                    >
                        Add to Cart
                    </button>
                    <button 
                        type="button" 
                        className='buy-now'
                        onClick=''    
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