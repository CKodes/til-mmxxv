import { Client } from "@notionhq/client"
import { PageObjectResponse } from "@notionhq/client"

interface CardContentData {
  pageId: string
  title: string
  date: string
  summary: string
  tags: string[]
}

const apiKey = process.env.NOTION_API_KEY
const notion = new Client({ auth: apiKey })

export async function queryDatabase(databaseId: string) {
  console.log("Querying database...")
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
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
      }
    })
  console.log("Database response returned")
  return cardContentData
}

export async function queryPage(pageId: string) {
  console.log("Querying page...")
  const response = await notion.blocks.children.list({
    block_id: pageId,
  })
  console.log("Page response returned")
  return response
}
