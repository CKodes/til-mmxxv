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

  const renderArticle = pageData.map((item) => {
    switch (item.type) {
      case "heading_1":
        return (
          <h1 key={item.id} className={styles.headingStyles}>
            {item.spans.map((span, i) => (
              <span key={`${item.id}-span-${i}`}>{span.text}</span>
            ))}
          </h1>
        )
      case "heading_2":
        return (
          <h2 key={item.id} className={styles.headingStyles}>
            {item.spans.map((span, i) => (
              <span key={`${i}`}>{span.text}</span>
            ))}
          </h2>
        )
      case "heading_3":
        return (
          <h3 key={item.id} className={styles.headingStyles}>
            {item.spans.map((span, i) => (
              <span key={`${i}`}>{span.text}</span>
            ))}
          </h3>
        )
      case "paragraph":
        return (
          <p key={item.id} className={styles.paragraphStyles}>
            {item.spans.map((span, i) => (
              <span key={`${i}`}>{span.text}</span>
            ))}
          </p>
        )
    }
  })

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
