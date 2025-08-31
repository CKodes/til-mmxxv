export type ArticleBlock = HeadingBlock | ParagraphBlock | CodeBlock

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

export interface CodeBlock {
  id: string
  type: "code"
  plainText: string
  language:
    | "bash"
    | "css"
    | "html"
    | "javascript"
    | "json"
    | "markdown"
    | "markup"
    | "powershell"
    | "python"
    | "ruby"
    | "sass"
    | "scheme"
    | "scss"
    | "shell"
    | "sql"
    | "toml"
    | "typescript"
    | "xml"
    | "yaml"
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
