import { fr } from "./translations/fr"
import { en } from "./translations/en"
import { ar } from "./translations/ar"
import type { Language, TranslationKeys } from "./types"

export const translations = {
  fr,
  en,
  ar,
}

export const languages = [
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
]

export const isRTL = (language: Language): boolean => {
  return language === "ar"
}

export const getTranslation = (language: Language): TranslationKeys => {
  return translations[language] || translations.fr
}

export * from "./types"
