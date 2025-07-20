import { queryDatabase, queryPage } from "@lib/notion"

export async function POST() {
  const databaseId = process.env.NOTION_DATABASE_ID!
  const data = await queryDatabase(databaseId)
  return Response.json(data)
}

export async function GET() {
  const pageId: string = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  const pageData = await queryPage(pageId)
  return Response.json(pageData)
}
