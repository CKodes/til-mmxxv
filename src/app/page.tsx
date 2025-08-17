"use client"

import Card, { CardProps } from "@components/Card/Card"
import styles from "./page.module.css"
import { useState, useEffect } from "react"

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notionData, setNotionData] = useState<any>(null)

  useEffect(() => {
    async function fetchNotionData() {
      try {
        const res = await fetch("/api/notion", { method: "POST" })
        const data = await res.json()
        setNotionData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        console.log(fetchNotionData())
      }
    }

    fetchNotionData()
  }, [])
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
          {notionData && <pre>{JSON.stringify(notionData, null, 2)}</pre>}
        </div>
      </main>
    </>
  )
}
