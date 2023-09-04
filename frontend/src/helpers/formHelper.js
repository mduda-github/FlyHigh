export const formMode = {
  NEW: "NEW",
  EDIT: "EDIT",
};

export const formValidationKeys = {
  notEmpty: "notEmpty",
  len_2_60: "len_2_60",
  len_5_60: "len_5_60",
  len_6: "len_6",
  len_3: "len_3",
  date: "date",
  email: "email",
  form: "form",
  login: "login",
};

export const getValidationErrorKey = (error) => {
  return error ? `validationMessage.${error}` : "";
};
