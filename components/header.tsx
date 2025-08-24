"use client"

import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import QuoteModal from "./quote-modal"
import { useI18n } from "@/lib/i18n/context"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openQuoteModal = () => {
    setIsQuoteModalOpen(true)
    setIsMenuOpen(false)
  }

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg transform translate-y-0"
            : "bg-white shadow-sm transform translate-y-0"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center group">
              <Globe className="h-8 w-8 text-primary mr-2 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
              <h1 className="text-2xl font-bold font-serif text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-105">
                Mox Voyage
              </h1>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="relative text-foreground hover:text-primary transition-all duration-300 py-2 group overflow-hidden"
              >
                <span className="relative z-10">{t.nav.home}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
              <Link
                href="/destinations"
                className="relative text-foreground hover:text-primary transition-all duration-300 py-2 group overflow-hidden"
              >
                <span className="relative z-10">{t.nav.destinations}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
              <Link
                href="/about"
                className="relative text-foreground hover:text-primary transition-all duration-300 py-2 group overflow-hidden"
              >
                <span className="relative z-10">{t.nav.about}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
              <Link
                href="/testimonials"
                className="relative text-foreground hover:text-primary transition-all duration-300 py-2 group overflow-hidden"
              >
                <span className="relative z-10">{t.nav.testimonials}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
              <Link
                href="/contact"
                className="relative text-foreground hover:text-primary transition-all duration-300 py-2 group overflow-hidden"
              >
                <span className="relative z-10">{t.nav.contact}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="absolute inset-0 bg-primary/5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <LanguageSwitcher />
              </div>
              <Button
                onClick={openQuoteModal}
                className="hidden sm:flex bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden group"
              >
                <span className="relative z-10">{t.nav.requestQuote}</span>
                <span className="absolute inset-0 bg-white/20 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
              </Button>

              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-500 ease-in-out ${
                      isMenuOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 w-6 h-6 text-foreground transition-all duration-500 ease-in-out ${
                      isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <nav className="py-4 space-y-2 border-t">
              <Link
                href="/"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/destinations"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.destinations}
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/testimonials"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.testimonials}
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-300 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
              <div className="px-2 pt-2">
                <Button
                  onClick={openQuoteModal}
                  className="w-full bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t.nav.requestQuote}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </>
  )
}
