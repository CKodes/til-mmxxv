// import React, { useState } from "react"
import React from "react"
import styles from "./style.module.css"
import { useRouter } from "next/navigation"

export interface CardProps {
  title: string
  date: string
  summary: string
  tags: string[]
  pageId: string
  slug: string
}

export default function Card({
  title,
  date,
  summary,
  tags,
  pageId,
  slug,
}: CardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/blogPage/${slug}`)
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
