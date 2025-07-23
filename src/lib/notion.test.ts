import { queryDatabase } from "./notion"
import { Client } from "@notionhq/client"
import { notionMockData } from "./__mocks__/notionMockData"

jest.mock("@notionhq/client")

const mockQuery = jest.fn()

const mockClient = Client as unknown as jest.Mock
mockClient.mockImplementation(() => ({
  databases: {
    query: mockQuery,
  },
}))

const mockDatabaseId = "3fa85f6457174562b3fc2c963f66afa6"

test("should return correct data", async () => {
  mockQuery.mockResolvedValue({
    results: notionMockData.map((item) => ({
      object: "page",
      ...item,
    })),
  })

  const response = await queryDatabase(mockDatabaseId)
  expect(mockQuery).toHaveBeenCalledWith({
    database_id: mockDatabaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
  })
  expect(response).toEqual([
    {
      pageId: "123a7654-123b-1234-cd12345ef1ab",
      title: "Entry 1: Centering with margin: 0 auto",
      date: "2025-07-17",
      summary: "Entry 1: Conditions where margin 0 auto requires to work",
      tags: ["CSS", "Project"],
    },
    {
      pageId: "987a4567-123b-1234-cd12345ef1ab",
      title: "Entry 2: Centering with margin: 0 auto",
      date: "2025-07-17",
      summary: "Entry 2: Conditions where margin 0 auto requires to work",
      tags: ["CSS", "Project"],
    },
    {
      pageId: "123a4567-123b-1234-cd12345ef1ab",
      title: "Entry 3: Centering with margin: 0 auto",
      date: "2025-07-17",
      summary: "Entry 3: Conditions where margin 0 auto requires to work",
      tags: ["CSS", "Project"],
    },
  ])
})
