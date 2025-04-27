// app/api/contact/page.ts
import { resend } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  try {
    await resend.emails.send({
      from: "contact@singbirds.net",
      to: "shunaruna@gmail.com", // 実際に受け取りたいアドレス
      subject: `New contact form submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
