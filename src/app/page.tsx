"use client"

import Card, { CardProps } from "@components/Card/Card"
import styles from "./page.module.css"
import { useState } from "react"

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notionData, setNotionData] = useState<any>(null)

  const handleClickPost = () => {
    fetch("/api/notion", { method: "Post" })
      .then((res) => res.json())
      .then(setNotionData)
      .catch(console.error)
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode")
  }

  return (
    <>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <main className={styles.main}>
        <section className={styles.grid}>
          {notionData &&
            notionData.map((item: CardProps, i: number) => (
              <Card
                key={i}
                title={item.title}
                date={item.date}
                summary={item.summary}
                tags={item.tags}
                pageId={item.pageId}
                slug={item.slug}
              ></Card>
            ))}
        </section>

        <div>
          <button onClick={handleClickPost}>Load Notion Data</button>
          {notionData && <pre>{JSON.stringify(notionData, null, 2)}</pre>}
        </div>
      </main>
    </>
  )
}
