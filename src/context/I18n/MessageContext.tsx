import React, { createContext, useContext, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
import { I18n, TranslateOptions } from 'i18n-js';
import { PluralScope, Scope } from './I18nTypes';
import * as en from './JSON/en.json';
import * as ja from './JSON/ja.json';

const i18n = new I18n({ en, ja });

type Locale = 'en' | 'ja';
interface LanguageConfig {
  languageTag: Locale;
  isRTL: boolean;
}

const fallback: LanguageConfig = { languageTag: 'en', isRTL: false };

const { languageTag } =
  RNLocalize.findBestLanguageTag(Object.keys(i18n.translations)) || fallback;

i18n.defaultLocale = languageTag;
i18n.locale = languageTag;

export function translate(key: Scope, options?: TranslateOptions): string;
export function translate(
  key: PluralScope,
  options: TranslateOptions & { count: number },
): string;
export function translate(key: any, options: any): string {
  return key ? i18n.t(key, options) : '';
}

interface ILanguageContext {
  currentLanguage: Locale;
  setLanguage: (lang: Locale) => void;
}

const LanguageContext = createContext<ILanguageContext>({
  currentLanguage: languageTag as Locale,
  setLanguage: () => undefined,
});

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(
    languageTag as Locale,
  );

  const setLanguage = (lang: Locale) => {
    if (i18n.translations[lang]) {
      i18n.locale = lang;
      setCurrentLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
