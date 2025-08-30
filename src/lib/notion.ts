import { BlockObjectResponse, Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client"
import { ArticleBlock } from "../app/entities/Article/types"
import { mapArticleBlock } from "../app/entities/Article/mapper"
interface CardContentData {
  pageId: string
  title: string
  date: string
  summary: string
  slug: string
  tags: string[]
  status: string
}

const apiKey = process.env.NOTION_API_KEY
const getNotionClient = () => new Client({ auth: apiKey })

export async function queryDatabase(databaseId: string) {
  console.log("Querying database...")
  const notion = getNotionClient()

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
        {
          property: "Status",
          status: {
            equals: "In progress",
          },
        },
      ],
    },
  })

  const cardContentData: CardContentData[] = response.results
    .filter((item): item is PageObjectResponse => item.object === "page")
    .map((item) => {
      const props = item.properties

      const titleProp = props["Title"]
      const dateProp = props["Date"]
      const summaryProp = props["Summary"]
      const tagsProp = props["Tags"]
      const slugProp = props["Slug"]
      const statusProp = props["Status"]

      return {
        pageId: item?.id,
        title:
          titleProp?.type === "title"
            ? titleProp.title?.[0]?.plain_text ?? ""
            : "",
        date: dateProp?.type === "date" ? dateProp.date?.start ?? "" : "",
        summary:
          summaryProp?.type === "rich_text"
            ? summaryProp.rich_text?.[0]?.plain_text ?? ""
            : "",
        tags:
          tagsProp?.type === "multi_select"
            ? tagsProp.multi_select.map((tag) => tag.name)
            : [],
        slug:
          slugProp?.type === "rich_text"
            ? slugProp.rich_text?.[0]?.plain_text ?? ""
            : "",
        status:
          statusProp?.type === "status" ? statusProp.status?.name ?? "" : "",
      }
    })
  console.log("Database response returned")
  return cardContentData
}

export async function queryPage(pageId: string) {
  const notion = getNotionClient()

  console.log("Querying page...")
  //ListBlockChildrenResponse
  const response = await notion.blocks.children.list({
    block_id: pageId,
  })

  const blocks = response.results.filter(
    (item): item is BlockObjectResponse => item.object === "block"
  )

  const articleBlocksData: ArticleBlock[] = mapArticleBlock(blocks)

  console.log("Page response returned")
  console.log("articleBlocksData", articleBlocksData)

  return articleBlocksData
}
