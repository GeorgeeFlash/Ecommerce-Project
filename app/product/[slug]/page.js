import React from 'react'

import { client } from '@/sanity/lib/client';
import { ProductPage } from '@/components';
import { productsQuerry, productQuerry } from '@/lib/data';

const ProductDetails = async ({ params: { slug }}) => {

    const query =  productQuerry(slug);
    // const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuerry)

  return (
    <div>
        <ProductPage product={product} products={products} />
    </div>
  )
}

export default ProductDetails