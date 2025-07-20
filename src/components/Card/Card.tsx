import React from "react"
import styles from "./style.module.css"

export interface CardProps {
  title: string
  date: string
  summary: string
  tags: string[]
}

export default function Card({ title, date, summary, tags }: CardProps) {
  return (
    <div className={styles.gridItem}>
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
