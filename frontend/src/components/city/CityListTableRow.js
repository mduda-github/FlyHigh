import * as React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authHelper";

Modal.setAppElement("#root");

export const CityListTableRow = (props) => {
  const { city, onDelete } = props;
  const { t } = useTranslation();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(city._id);
  };

  return (
    <tr>
      <td>{city.name}</td>
      <td>{city.code}</td>
      {isAuthenticated() ? (
        <td>
          <ul className="list-actions">
            <li>
              <Link
                to={`/cities/details/${city._id}`}
                className="list-actions-button-details"
              >
                {t("listActions.details")}
              </Link>
            </li>
            <li>
              <Link
                to={`/cities/edit/${city._id}`}
                className="list-actions-button-edit"
              >
                {t("listActions.edit")}
              </Link>
            </li>
            <li>
              <Link onClick={openModal} className="list-actions-button-delete">
                {t("listActions.delete")}
              </Link>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
              >
                <h2>{t("listActions.delete")}</h2>

                <p>
                  {t("listActions.deleteConformation")} {city.name}?
                </p>
                <div>
                  <button className="form-button-submit" onClick={handleDelete}>
                    {t("listActions.confirm")}
                  </button>
                  <button className="form-button-cancel" onClick={closeModal}>
                    {t("listActions.refuse")}
                  </button>
                </div>
              </Modal>
            </li>
          </ul>
        </td>
      ) : null}
    </tr>
  );
};
