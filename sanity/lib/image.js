import { useNextSanityImage } from 'next-sanity-image'
import { client } from './client'

export const imageProps = (image) =>  useNextSanityImage(client, image);
