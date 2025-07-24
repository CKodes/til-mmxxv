import React, { useState } from "react"
import styles from "./style.module.css"

export interface CardProps {
  title: string
  date: string
  summary: string
  tags: string[]
  pageId: string
}

export default function Card({
  title,
  date,
  summary,
  tags,
  pageId,
}: CardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pageData, setPageData] = useState<any>(null)

  const handleCardClick = () => {
    fetch(`api/notion?pageId=${pageId}`, { method: "GET" }).then((res) =>
      res.json().then(setPageData).catch(console.error)
    )
  }
  return (
    <div className={styles.gridItem} onClick={handleCardClick}>
      <p>{title}</p>
      <p>{date}</p>
      <p>{summary}</p>
      <ul className={styles.tags}>
        {tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
      {pageData && <pre>{JSON.stringify(pageData, null, 2)}</pre>}
    </div>
  )
}
