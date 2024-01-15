"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FooterBanner = ({ footerBanner: { discount, LargeText1, LargeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{LargeText1}</h3>
          <h3>{LargeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <Image 
          src={image}
          width={450}
          height={450}
          alt='footer-banner-image'
          className='footer-banner-image'
        />
      </div>
    </div>
  )
}

export default FooterBanner