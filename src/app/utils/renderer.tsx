import { RichTextSpan } from "../entities/Article/types"

export function renderSpan(span: RichTextSpan, key: number): React.ReactNode {
  let el: React.ReactNode = span.text
  if (span.annotations.isBold) {
    el = <strong>{el}</strong>
  }
  if (span.annotations.isItalic) {
    el = <em>{el}</em>
  }
  if (span.annotations.isUnderline) {
    el = <u>{el}</u>
  }
  if (span.annotations.isStrikethrough) {
    el = <s>{el}</s>
  }
  if (span.annotations.isCode) {
    el = <code>{el}</code>
  }
  if (span.href) {
    el = (
      <a href={span.href} target="_blank">
        {el}
      </a>
    )
  }

  return <span key={`${key}`}>{el}</span>
}
