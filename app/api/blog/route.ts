import { NextResponse } from "next/server"
import { getAllBlogPosts, getAllTags } from "@/lib/content"

export async function GET() {
  try {
    const posts = getAllBlogPosts()
    const tags = getAllTags()

    return NextResponse.json({
      posts,
      tags,
    })
  } catch (error) {
    console.error("Error fetching blog data:", error)
    return NextResponse.json({ error: "Failed to fetch blog data" }, { status: 500 })
  }
}
