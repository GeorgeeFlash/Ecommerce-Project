"use client"

import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

const HeroBanner = ({ heroBanner: { largeText1, largeText2, smallText, saleTime, desc, product, discount, midText, image, buttonText } }) => {


  return (
    <div className='hero-banner-container'>
      <div className="">
        <p className="beats-solo">
          {smallText}
        </p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image 
          src={image}
          width={450}
          height={450}
          priority={true}
          alt="headphones" 
          className='hero-banner-image image-cover' 
        />
        <div className="">
          <Link
            href={`/product/${product}`}
          >
            <button type='button'>{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner