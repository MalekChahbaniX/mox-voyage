"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { languages } from "@/lib/i18n"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n()

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto border-none bg-transparent hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
