import { simpleBlogCard } from "./lib/interface"
import { SanityClient } from "./lib/sanity"

import BlogCard from "./components/PostCard"

export const revalidate = 30 // revalidate at most every 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      shortDescription,
      "currentSlug": slug.current,
      coverImage
  }
  `
  const data = await SanityClient.fetch(query)
  return data
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData()

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-24 ">
      {data.map((post) => (
        <BlogCard key={post.currentSlug} post={post} />
      ))}
    </div>
  )
}
