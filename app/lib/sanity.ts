import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const SanityClient = createClient({
    projectId: "q6ke5lpj",
    dataset: "production",
    apiVersion: "2022-03-07",
    useCdn: false
})

// Sanity function to allow easy way to use stored images
const builder = imageUrlBuilder(SanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}