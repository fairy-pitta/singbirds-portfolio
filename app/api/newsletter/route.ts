// app/api/newsletter/route.ts
import { resend } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "No email provided" }, { status: 400 })
    }

    const result = await resend.emails.send({
      from: "newsletter@singbirds.net",
      to: "あなたの受信アドレス", 
      subject: "New Newsletter Subscriber",
      html: `<p><strong>New subscriber email:</strong> ${email}</p>`,
    })

    if (result.error) {
      console.error("Resend error:", result.error)
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Catch block error:", error.message || error)
    return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 })
  }
}