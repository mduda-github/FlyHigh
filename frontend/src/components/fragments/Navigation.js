import * as React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";

class Navigation extends React.Component {
  handleLanguageChange = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language, (err, t) => {
      if (err) return console.log("sum ting wrong", err);
    });
  };

  render() {
    const { t } = this.props;
    const loginLogoutLink = isAuthenticated() ? (
      <button onClick={this.props.handleLogout}>
        {t("auth.logoutBtnLabel")}
      </button>
    ) : (
      <Link to="/login">{t("nav.login")}</Link>
    );
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">{t("nav.mainPage")}</Link>
          </li>
          <li>
            <Link to="/cities">{t("nav.cities")}</Link>
          </li>
          <li>
            <Link to="/flights">{t("nav.flights")}</Link>
          </li>
          <li>
            <Link to="/planes">{t("nav.planes")}</Link>
          </li>
          {isAuthenticated() ? (
            <li>
              <Link to="/users">{t("nav.users")}</Link>
            </li>
          ) : null}
          <li>
            <button onClick={() => this.handleLanguageChange("pl")}>PL</button>
          </li>
          <li>
            <button onClick={() => this.handleLanguageChange("en")}>EN</button>
          </li>
          <li>{loginLogoutLink}</li>
        </ul>
      </nav>
    );
  }
}

export default withTranslation()(Navigation);
