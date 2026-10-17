"use client";

import i18n from "@/lib/i18n";
import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

interface Props {
  lang: string;
  children: ReactNode;
}

export default function I18nProvider({ lang, children }: Props) {
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
