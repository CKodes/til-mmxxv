import { queryDatabase, queryPage } from "@lib/notion"
import styles from "./style.module.css"

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
  const renderArticle = pageData.map((item) => (
    <li className={styles.list} key={item.id}>
      <p>{item.spans.map((text) => text.text)}</p>
    </li>
  ))

  return (
    <>
      <main>
        <article>
          <h1>{post.title}</h1>

          <div className={styles.parentStyles}>
            <pre className={styles.wordWrap}>
              {/* {JSON.stringify(pageData, null, 2)} */}
              {renderArticle}
            </pre>
            {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
          </div>
        </article>
      </main>
    </>
  )
}
