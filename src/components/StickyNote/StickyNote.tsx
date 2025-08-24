"use client"

/* Sticky Note adapted from Thorsten Meier
   https://dev.to/thormeier/fully-responsive-html-css-sticky-note-4okl
   Original CodePen: https://codepen.io/thormeier/pen/JjXmppX
*/

import React, { ReactNode, useId } from "react"
import styles from "./style.module.css"
import { motion } from "framer-motion"

export interface StickyNoteProps {
  children: ReactNode
}

export default function StickyNote({ children }: StickyNoteProps) {
  const clipPathId = useId()

  return (
    <motion.div
      className={styles.stickyContainer}
      drag
      dragMomentum={true}
      whileDrag={{ scale: 1.05, rotate: 1.5 }}
    >
      <div className={styles.stickyContainer}>
        <div className={styles.containerInner}>
          <div className={styles.stickyOuter}>
            <div className={styles.sticky}>
              <svg width="0" height="0">
                <defs>
                  <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                    <path
                      d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                      strokeLinejoin="round"
                      strokeLinecap="square"
                    />
                  </clipPath>
                </defs>
              </svg>
              <div
                className={styles.stickyContent}
                style={{ clipPath: `url(#${clipPathId})` }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
