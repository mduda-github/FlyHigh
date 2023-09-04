import * as React from "react";
import { useTranslation } from "react-i18next";

export const UserDetailsData = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <>
      <p>
        {t("user.fields.firstName")}: {user.firstName}
      </p>
      <p>
        {t("user.fields.lastName")}: {user.lastName}
      </p>
      <p>
        {t("user.fields.email")}: {user.email}
      </p>
    </>
  );
};
