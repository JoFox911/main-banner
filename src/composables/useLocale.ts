import { useI18n } from "vue-i18n";

export function useLocale() {
  const { t, locale } = useI18n();

  const changeLocale = (newLocale: "en" | "uk") => {
    locale.value = newLocale;
    localStorage.lang = newLocale;
  };

  return {
    t,
    locale,
    changeLocale,
  };
}
