# Blog

Build a Next.js 14 Blog | React, Sanity.io, Tailwind.css, Shadcn/Ui

## Setting up Sanity

1- **follow [the doc](https://www.sanity.io/docs/create-a-sanity-project) to install Sanity into the project**

2- **Create schema following this pattern**:

    // schemas/pet.js

    export default {
    name: 'pet',
    type: 'document',
    title: 'Pet',
    fields: [
        {
        name: 'name',
        type: 'string',
        title: 'Name'
        }
    ]
    }

3- **Run the newly created Sanity locally `usually on port 3333` and create contents**.

4 - **Create a query in the `localhost:3333/vision`**

Example query:

    *[_type == 'blog']| order(releaseDate desc) {
    title,
        shortDescription,
        "currentSlug": slug.current
    }

In this query, We filter for 'blog' type and in that type we call for few thing: 1- title, 2- shortDescription, 3 - slug.current *(We create a key "currentSlug" to call that value)*

5 - **Create Sanity client**

- install `npm i next-sanity`
- Create app > lib > sanity.ts

        import { createClient } from "next-sanity";

        export const SanityClient = createClient({
            projectId: "q6ke5lpj",
            dataset: "production",
            apiVersion: "2022-03-07",
            useCdn: false
        })

6 - use the query to fetch sanity data

    async function getData() {
        const query = `
        *[_type == 'blog']| order(releaseDate desc) {
            title,
            shortDescription,
            "currentSlug": slug.current,
            coverImage
        }
        `
        const data = await SanityClient.fetch(query)
        return data
    }

7 - In case of rendering Sanity image, There is a spacial function to apply from sanity along with a npm package:

        npm i sanity/image-url  

export the following function from app>lib>sanity.ts

    import imageUrlBuilder from '@sanity/image-url'

        const builder = imageUrlBuilder(SanityClient)

    export function urlFor(source: any) {
    return builder.image(source)
    }

Use it as follow:

    <Image 
        src={urlFor(post.coverImage).url()}
        ...
    >

## Render Sanity data

We are able to setup sanity schema, add contents and fetch contents.
The rest is just FE work as usual. display content and use route for each post slug.

Note: to render the post content, use **@portabletext/react** package as recommended by Sanity team.

    import { PortableText } from "@portabletext/react"

    <PortableText value={data.content} />

To Style the post content properly, we have to use tailwind plugin which is created for "Beautiful typographic defaults for HTML you don't control." it is
**@tailwindcss/typography**, add it to Tailwind.config and [use it according to their docs](https://tailwindcss.com/docs/typography-plugin)
