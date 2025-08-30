import { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client"
import { Annotations, ArticleBlock } from "./types"

function mapAnnotations(span: RichTextItemResponse): Annotations {
  const annotations: Annotations = {}
  if (span.annotations.bold) annotations.isBold = true
  if (span.annotations.italic) annotations.isItalic = true
  if (span.annotations.strikethrough) annotations.isStrikethrough = true
  if (span.annotations.underline) annotations.isUnderline = true
  if (span.annotations.code) annotations.isCode = true
  return annotations
}

export function mapArticleBlock(
  notionBlocks: BlockObjectResponse[]
): ArticleBlock[] {
  return notionBlocks
    .map((notionBlock) => {
      switch (notionBlock.type) {
        case "heading_1":
          return {
            type: "heading_1",
            spans: notionBlock.heading_1.rich_text.map((span) => ({
              text: span.plain_text,
              annotations: mapAnnotations(span),
            })),
          }
        case "heading_2":
          return {
            type: "heading_2",
            spans: notionBlock.heading_2.rich_text.map((span) => ({
              text: span.plain_text,
              annotations: mapAnnotations(span),
            })),
          }
        case "heading_3":
          return {
            type: "heading_3",
            spans: notionBlock.heading_3.rich_text.map((span) => ({
              text: span.plain_text,
              annotations: mapAnnotations(span),
            })),
          }
        case "paragraph":
          return {
            type: "paragraph",
            spans: notionBlock.paragraph.rich_text.map((span) => ({
              text: span.plain_text,
              annotations: mapAnnotations(span),
              href: span.href ?? undefined,
            })),
          }
        default:
          return undefined
      }
    })
    .filter((block): block is ArticleBlock => block !== undefined)
}
