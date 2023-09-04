import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formMode } from "../../helpers/formHelper";

export const FormButtons = (props) => {
  const { currentFormMode, error, cancelPath } = props;
  const { t } = useTranslation();

  const submitButtonLabel =
    currentFormMode === formMode.NEW
      ? t("city.form.add.btnLabel")
      : t("city.form.edit.btnLabel");
  return (
    <div className="form-buttons">
      <p id="errorsSummary" className="errors-text">
        {error}
      </p>
      <input
        className="form-button-submit"
        type="submit"
        value={submitButtonLabel}
      />
      <Link to={cancelPath} className="form-button-cancel">
        {t("city.form.add.backBtnLabel")}
      </Link>
    </div>
  );
};
