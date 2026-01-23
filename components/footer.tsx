import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border/40 mt-20 lg:mt-32">
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Product Column */}
          {/* Product Column */}
          {/* <div className="col-span-1">
            <h3 className="text-sm font-normal text-muted-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/pricing"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Use cases
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-normal text-muted-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-1">
              {/* <li>
                <Link
                  href="https://invook.notion.site/Getting-Started-28f7f199308b80658fc8f2e93ec90087?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Download
                </Link>
              </li> */}
              <li>
                <Link
                  href="/changelog"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="https://invook.notion.site/Public-Invook-2917f199308b80da8923e91ff857e08d?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/llm.txt"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                  target="_blank"
                >
                  llm.txt
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-normal text-muted-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://invook.notion.site/Careers-2917f199308b80aead5dfb1c2d6142dd?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="https://invook.notion.site/About-2917f199308b8035a4efc8204a1293f9?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@thinkingsoundlab.com"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-normal text-muted-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://invook.notion.site/Terms-of-Use-2917f199308b8085ae78ce56ba9fd0b3?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="https://invook.notion.site/Privacy-Policy-2917f199308b806bae6bd0588ac8c2c2?source=copy_link"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column (Socials) */}
          <div className="col-span-1">
            <h3 className="text-sm font-normal text-muted-foreground mb-4">
              Connect
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="https://discord.gg/UqabBguBzk"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/company/thinking-sound-lab-25"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/channel/UCeuCsCIquUCHfRHTmmL-n4g"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/invook.ai?igsh=MW11Z2tpeXVsb2ljcg%3D%3D&utm_source=qr"
                  className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Theme Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            © 2025 Thinking Sound Lab. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}


