import { queryDatabase, queryPage } from "@lib/notion"

export async function POST() {
  const databaseId = process.env.NOTION_DATABASE_ID!
  const data = await queryDatabase(databaseId)
  return Response.json(data)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageId = searchParams.get("pageId")

  if (!pageId) {
    return new Response("Missing pageId", { status: 400 })
  }
  const pageData = await queryPage(pageId)
  return Response.json(pageData)
}
