export const productsQuerry = `*[_type == "product"] {
        _id,
        details,
        "slug": slug.current,
        name,
        "image": image[].asset -> {_id, url},
        price,
    }`


export const bannerDataQuerry = `*[_type == "banner"] {
        discount,
        smallText,
        saleTime,
        largeText1,
        midText,
        "image": image.asset -> url,
        desc,
        buttonText,
        product,
        largeText2,
    }`

export const productQuerry = (slug) => {
    const query = `*[_type == "product" && slug.current == '${slug}'] {
        _id,
        details,
        "slug": slug.current,
        name,
        "image": image[].asset -> {_id, url},
        price,
    }[0]`

    return query
} 