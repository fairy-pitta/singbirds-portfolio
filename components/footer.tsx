import { GithubIcon, MailIcon, TwitterIcon } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold gradient-text mb-2">SingBirds</h3>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Bridging environmental science and technology.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/fairy-pitta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sky-500 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/fairy_pitta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-sky-500 transition-colors"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:momotus.lessonii@gmail.com"
              className="text-muted-foreground hover:text-sky-500 transition-colors"
              aria-label="Email"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">&copy; {currentYear} SingBirds. All rights reserved.</div>

          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-muted-foreground hover:text-sky-500 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-sky-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
