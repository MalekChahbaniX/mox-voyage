"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language, TranslationKeys } from "./types"
import { getTranslation, isRTL } from "./index"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("mox-voyage-language") as Language
    if (savedLanguage && ["fr", "en", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("mox-voyage-language", language)

    // Update document direction and lang attribute
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = getTranslation(language)

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL: isRTL(language),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
