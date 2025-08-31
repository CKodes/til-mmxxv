export type ArticleBlock = HeadingBlock | ParagraphBlock

export interface HeadingBlock {
  id: string
  type: "heading_1" | "heading_2" | "heading_3"
  spans: RichTextSpan[]
}

export interface ParagraphBlock {
  id: string
  type: "paragraph"
  spans: RichTextSpan[]
}

export interface RichTextSpan {
  text: string
  annotations: Annotations
  href?: string
}

export interface Annotations {
  isBold?: true
  isItalic?: true
  isStrikethrough?: true
  isUnderline?: true
  isCode?: true
}
