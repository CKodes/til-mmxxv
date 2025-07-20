import React from "react"
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
  const handleCardClick = () => {
    alert(pageId)
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
    </div>
  )
}
