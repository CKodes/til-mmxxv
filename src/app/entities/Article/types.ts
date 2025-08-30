export type ArticleBlock = HeadingBlock | ParagraphBlock

export interface HeadingBlock {
  type: "heading_1" | "heading_2" | "heading_3"
  spans: RichTextSpan[]
}

export interface ParagraphBlock {
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
