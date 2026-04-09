import { defineQuery } from "next-sanity";

export const ALL_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork"] | order(featured desc, year desc) {
    _id,
    title,
    "slug": slug.current,
    collection,
    year,
    price,
    mainImage,
    status,
    featured,
    description,
    size,
    medium
  }
`);

export const ALL_ARTWORK_SLUGS_QUERY = defineQuery(`
  *[_type == "artwork" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const ARTWORK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    collection,
    year,
    price,
    mainImage,
    galleryImages,
    status,
    featured,
    description,
    size,
    medium
  }
`);

export const FEATURED_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork" && featured == true] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    collection,
    year,
    price,
    mainImage,
    status,
    featured,
    description,
    size,
    medium
  }
`);