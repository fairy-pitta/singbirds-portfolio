"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SendIcon, CheckCircle, BellIcon } from "lucide-react"

interface ContactFormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  // コンタクトフォームの状態
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [isContactSubmitted, setIsContactSubmitted] = useState(false)

  // ニュースレターフォームの状態
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // コンタクトフォームの入力ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  // コンタクトフォームの送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSubmitting(true)

    // 送信シミュレーション
    setTimeout(() => {
      setIsContactSubmitting(false)
      setIsContactSubmitted(true)
      setFormState({
        name: "",
        email: "",
        message: "",
      })

      // 5秒後に成功メッセージをリセット
      setTimeout(() => {
        setIsContactSubmitted(false)
      }, 5000)
    }, 1500)
  }

  // ニュースレターフォームの送信ハンドラ
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewsletterSubmitting(true)

    // 送信シミュレーション
    setTimeout(() => {
      setIsNewsletterSubmitting(false)
      setIsSubscribed(true)
      setNewsletterEmail("")

      // 3秒後に成功メッセージをリセット
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-sky-800">Connect With Me</h2>
          <p className="text-sky-600 max-w-2xl mx-auto">
            Have a question or want to stay updated? Reach out or subscribe to my newsletter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* コンタクトフォーム */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-sky-100 dark:border-sky-800 shadow-sm hover:shadow-md transition-shadow bg-white/85 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-sky-700 dark:text-sky-300">Get In Touch</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mb-4"></div>
                  <p className="text-muted-foreground">
                    Have a question or want to collaborate? Send me a message and I'll get back to you soon.
                  </p>
                </div>

                {isContactSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="h-12 w-12 mx-auto text-sky-500 dark:text-sky-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-sky-700 dark:text-sky-300">Message Sent!</h3>
                    <p className="text-sky-600 dark:text-sky-400">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-medium block mb-1.5 text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="border-sky-100 dark:border-sky-800 focus:border-sky-300 dark:focus:border-sky-600"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium block mb-1.5 text-gray-700 dark:text-gray-300"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="border-sky-100 dark:border-sky-800 focus:border-sky-300 dark:focus:border-sky-600"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="text-sm font-medium block mb-1.5 text-gray-700 dark:text-gray-300"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={4}
                        className="border-sky-100 dark:border-sky-800 focus:border-sky-300 dark:focus:border-sky-600 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 transition-all duration-300"
                      disabled={isContactSubmitting}
                    >
                      {isContactSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <SendIcon className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* ニュースレターフォーム */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            id="newsletter"
          >
            <Card className="h-full border-sky-100 dark:border-sky-800 shadow-sm hover:shadow-md transition-shadow bg-white/85 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-sky-700 dark:text-sky-300">Stay Updated</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mb-4"></div>
                  <p className="text-muted-foreground">
                    Subscribe to receive new articles, project updates, and environmental tech insights.
                  </p>
                </div>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800 rounded-lg p-6 text-center"
                  >
                    <CheckCircle className="h-12 w-12 mx-auto text-sky-500 dark:text-sky-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-sky-700 dark:text-sky-300">
                      Thanks for subscribing!
                    </h3>
                    <p className="text-sky-600 dark:text-sky-400">
                      You'll receive our next newsletter with the latest updates.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-5">
                    <div>
                      <label
                        htmlFor="newsletter-email"
                        className="text-sm font-medium block mb-1.5 text-gray-700 dark:text-gray-300"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <Input
                          id="newsletter-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10 border-sky-100 dark:border-sky-800 focus:border-sky-300 dark:focus:border-sky-600"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          required
                          disabled={isNewsletterSubmitting}
                        />
                        <BellIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sky-400 dark:text-sky-500" />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 transition-all duration-300"
                      disabled={isNewsletterSubmitting}
                    >
                      {isNewsletterSubmitting ? (
                        <>
                          <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <BellIcon className="h-4 w-4 mr-2" />
                          Subscribe to Newsletter
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-2">
                      By subscribing, you agree to our{" "}
                      <a href="/privacy" className="underline hover:text-sky-500">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
