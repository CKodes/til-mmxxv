import { queryDatabase, queryPage } from "@lib/notion"

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const posts = await queryDatabase(process.env.NOTION_DATABASE_ID!)
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <div>404: Post not found</div>

  const pageData = await queryPage(post.pageId)

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div>
        <pre>{JSON.stringify(pageData, null, 2)}</pre>
      </div>
    </article>
  )
}
