import { BlogPage } from "@/app/lib/interface"
import { SanityClient, urlFor } from "@/app/lib/sanity"
import Image from "next/image"
import { PortableText } from "@portabletext/react"

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
        "currentSlug": slug.current,
           title,
          coverImage,
          content,
        "createdAt": _createdAt
      }[0]
    `

  const data = await SanityClient.fetch(query)
  return data
}

export default async function BlogSlug({
  params,
}: {
  params: { slug: string }
}) {
  const data: BlogPage = await getData(params.slug)
  return (
    <article className="flex flex-col justify-center gap-8 w-full py-16">
      <div className="h-[250px] md:h-[500px]">
        <Image
          src={urlFor(data.coverImage).url()}
          width={500}
          height={500}
          alt="Post cover image"
          priority
          className="object-cover min-w-full h-full"
        />
      </div>

      <div>
        <h1 className="text-3x1 leading-8 font-bold tracking-tight sm:text-4xl max-w-4xl">
          {data.title}
        </h1>
        <p className="text-sm text-muted-foreground tracking-tight pt-2">
          Presented to you by NextBlog & ChatGPT
        </p>
      </div>
      <div className="max-w-3xl prose prose-slate dark:prose-invert  prose-code:bg-secondary prose-code:p-2 prose-code:rounded-sm">
        <PortableText value={data.content} />
      </div>
    </article>
  )
}
