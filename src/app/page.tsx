import Card, { CardProps } from "@components/Card/Card"
import styles from "./page.module.css"
import { queryDatabase } from "@lib/notion"

export default async function Home() {
  const notionData: CardProps[] = await queryDatabase(
    process.env.NOTION_DATABASE_ID!
  )

  return (
    <>
      <main className={styles.main}>
        <section className={styles.grid}>
          {notionData.map((item, i) => (
            <Card
              key={i}
              title={item.title}
              date={item.date}
              summary={item.summary}
              tags={item.tags}
              slug={item.slug}
            />
          ))}
        </section>
        <div>
          <pre>{JSON.stringify(notionData, null, 2)}</pre>
        </div>
      </main>
    </>
  )
}
