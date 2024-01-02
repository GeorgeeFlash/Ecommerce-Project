"use client"

import Link from 'next/link'
import React from 'react'

import { imageProps } from '@/sanity/lib/image'
import Image from 'next/image';

const HeroBanner = ({ heroBanner }) => {

  const imgProps = imageProps(heroBanner.image);

  return (
    <div className='hero-banner-container'>
      <div className="">
        <p className="beats-solo">
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <Image 
          {...imgProps}
          style={{ width: '250', height: '250' }}
          alt="headphones" 
          className='hero-banner-image image-cover' 
        />
        <div className="">
          <Link
            href={`/product/${heroBanner.product}`}
          >
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner