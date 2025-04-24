import { NextResponse } from "next/server"
import { getAllProjects } from "@/lib/content"

export async function GET() {
  try {
    const projects = getAllProjects()

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error fetching projects data:", error)
    return NextResponse.json({ error: "Failed to fetch projects data" }, { status: 500 })
  }
}
