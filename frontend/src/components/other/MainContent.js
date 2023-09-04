import * as React from "react";
import { useTranslation } from "react-i18next";

export const MainContent = () => {
  const { t } = useTranslation();
  return (
    <main>
      <h2>{t("mainPage.title")}</h2>
      <p>{t("mainPage.content")}</p>
    </main>
  );
};
