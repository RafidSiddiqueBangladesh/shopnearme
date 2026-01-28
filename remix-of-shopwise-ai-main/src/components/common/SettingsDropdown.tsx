import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Sun, Moon, Globe, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const SettingsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
            {/* Theme Section */}
            <div className="p-3 border-b border-border">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {t('common.theme')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { toggleTheme(); if (theme === 'dark') return; }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  {t('common.light')}
                </button>
                <button
                  onClick={() => { toggleTheme(); if (theme === 'light') return; }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    theme === 'dark'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  {t('common.dark')}
                </button>
              </div>
            </div>

            {/* Language Section */}
            <div className="p-3">
              <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                {t('common.language')}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all ${
                    language === 'en'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setLanguage('bn')}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all ${
                    language === 'bn'
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  <span>বাংলা (Bangla)</span>
                  {language === 'bn' && <Check className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsDropdown;
