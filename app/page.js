import { Product, FooterBanner, HeroBanner } from '@/components'
import { client } from '@/sanity/lib/client';
import { productsQuerry, bannerDataQuerry } from '@/lib/data';

export default async function Home() {

  const products = await client.fetch(productsQuerry)

  const bannerData = await client.fetch(bannerDataQuerry)

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}
