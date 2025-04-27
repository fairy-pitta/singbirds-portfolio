// app/api/newsletter/route.ts
import { resend } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()

  try {
    await resend.emails.send({
      from: "newsletter@singbirds.net",  // ニュースレター用のFromアドレス
      to: "shunaruna@gmail.com",         // あなたが登録を受け取りたいメールアドレス
      subject: "New Newsletter Subscriber",
      html: `
        <p><strong>New subscriber email:</strong> ${email}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}