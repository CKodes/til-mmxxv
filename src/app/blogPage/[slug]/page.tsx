import { queryDatabase, queryPage } from "@lib/notion"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const posts = await queryDatabase(process.env.NOTION_DATABASE_ID!)
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <div>404: Post not found</div>

  const pageData = await queryPage(post.pageId)

  return (
    <>
      <main>
        <article>
          <h1>{post.title}</h1>

          {/* <div>
            <pre>{JSON.stringify(pageData, null, 2)}</pre>
            <pre>{JSON.stringify(posts, null, 2)}</pre>
          </div> */}
        </article>
      </main>
    </>
  )
}
