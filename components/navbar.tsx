"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MenuIcon, XIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

interface NavLink {
  name: string
  href: string
  isSection: boolean
  sectionId: string
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // セクションへのナビゲーション処理
  const navigateToSection = (sectionId: string) => {
    if (isHomePage) {
      // ホームページにいる場合は、直接スクロール
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 80 // ナビバーの高さを適宜調整
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    } else {
      // 他のページにいる場合は、クエリパラメータ付きでホームページに移動
      // URLにハッシュも追加して、JavaScriptが無効な場合でも動作するようにする
      router.push(`/?section=${sectionId}#${sectionId}`)
    }

    // モバイルメニューを閉じる
    setIsMenuOpen(false)
  }

  // ナビゲーションリンクの定義
  const navLinks: NavLink[] = [
    { name: "About", href: "#about", isSection: true, sectionId: "about" },
    { name: "Skills", href: "#skills", isSection: true, sectionId: "skills" },
    { name: "Projects", href: "/projects", isSection: false, sectionId: "" },
    { name: "Blog", href: "/blog", isSection: false, sectionId: "" },
    { name: "Contact", href: "#contact", isSection: true, sectionId: "contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/fairy-pitta.png"
                alt="SingBirds Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold gradient-text">SingBirds</span>
          </Link>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className={scrolled || !isHomePage ? "" : "bg-sky-600/80 hover:bg-sky-700/80 text-white"}
              >
                {isMenuOpen ? (
                  <XIcon
                    className={`h-5 w-5 ${
                      scrolled || !isHomePage ? "text-sky-600" : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                    }`}
                  />
                ) : (
                  <MenuIcon
                    className={`h-5 w-5 ${
                      scrolled || !isHomePage ? "text-sky-600" : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                    }`}
                  />
                )}
              </Button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-sky-50/95 backdrop-blur-md shadow-md p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.isSection ? (
                      <button
                        onClick={() => navigateToSection(link.sectionId)}
                        className="w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-100 rounded-md transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="px-4 py-2 text-sky-700 hover:bg-sky-100 rounded-md transition-colors block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              // 現在のページがリンク先と一致するかチェック
              const isActive =
                (link.href === "/projects" && pathname.startsWith("/projects")) ||
                (link.href === "/blog" && pathname.startsWith("/blog"))

              if (link.isSection) {
                return (
                  <button
                    key={link.name}
                    onClick={() => navigateToSection(link.sectionId)}
                    className={`text-sm font-medium transition-colors ${
                      scrolled || !isHomePage
                        ? "text-sky-600 hover:text-sky-800"
                        : "text-white hover:text-sky-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] font-semibold"
                    }`}
                  >
                    {link.name}
                  </button>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-sky-800 font-semibold"
                      : scrolled || !isHomePage
                        ? "text-sky-600 hover:text-sky-800"
                        : "text-white hover:text-sky-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)] font-semibold"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
