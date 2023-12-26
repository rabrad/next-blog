import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { urlFor } from "../lib/sanity"
import { simpleBlogCard } from "../lib/interface"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogCardProps {
  post: simpleBlogCard
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden">
      <Image
        src={urlFor(post.coverImage).url()} // The way image function works with Sanity.
        width={500}
        height={500}
        alt="post image"
        priority
        className="object-cover h-[180px] w-full rounded-t-sm"
      />
      <CardContent className="px-2 pt-2 pb-6">
        <CardTitle className="my-4 font-medium text-lg leading-6 line-clamp-2">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.shortDescription}
        </CardDescription>

        <Button variant="secondary" asChild className="w-full mt-6">
          <Link href={`/blog/${post.currentSlug}`}>Explore</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default BlogCard
