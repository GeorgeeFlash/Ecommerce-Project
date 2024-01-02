"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { imageProps } from '@/sanity/lib/image'

const Product = ({ product: { image, name, slug, price } }) => {

  const imgProps = imageProps(image[0]);

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image 
            {...imgProps}
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