"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Product = ({ product: { image, name, slug, price } }) => {

  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <Image 
            src={image[0].url}
            width={250}
            height={250}
            alt='product-image'
            className='product-image'
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product