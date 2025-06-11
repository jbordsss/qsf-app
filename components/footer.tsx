import Link from "next/link"
import { Logo } from "@/components/logo"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              The Quanta Standard Foundation App is your premier gateway to the quantum world, delivering
              cutting-edge news and discoveries in quantum science and technology.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-orbitron text-lg font-bold mb-4 text-primary">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/quantum-computing" className="text-sm hover:text-primary transition-colors">
                  Quantum Computing
                </Link>
              </li>
              <li>
                <Link href="/category/quantum-physics" className="text-sm hover:text-primary transition-colors">
                  Quantum Physics
                </Link>
              </li>
              <li>
                <Link href="/category/quantum-technology" className="text-sm hover:text-primary transition-colors">
                  Quantum Technology
                </Link>
              </li>
              <li>
                <Link href="/category/quantum-research" className="text-sm hover:text-primary transition-colors">
                  Quantum Research
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-orbitron text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="font-orbitron text-lg font-bold mb-4 text-primary">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <div>
              <Link
                href="mailto:info@quantastandard.org"
                className="text-sm flex items-center hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                info@quantastandard.org
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Quanta Standard Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
