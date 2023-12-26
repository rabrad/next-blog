export default {
    name: 'blog',
    type: "document",
    title: "Blog",
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog post'
        },
        {
            name: 'slug',
            type: 'slug',
            title: 'Slug of the post',
            options: {
                source: 'title'
            }
        },
        {
            name: 'coverImage',
            type: 'image',
            title: "Cover Image of the post"
        },
        {
            name: 'shortDescription',
            type: 'text',
            title: 'Short description'
        },
        {
            name: 'content',
            type: 'array',
            title: "content",
            of: [
                {
                    type: 'block'
                }
            ]
        }
    ]
}