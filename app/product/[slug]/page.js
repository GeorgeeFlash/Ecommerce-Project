import React from 'react'

import { client } from '@/sanity/lib/client';
import { ProductPage } from '@/components';

const ProductDetails = async ({ params: { slug }}) => {

    const query =  `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)

  return (
    <div>
        <ProductPage product={product} products={products} />
    </div>
  )
}

export default ProductDetails