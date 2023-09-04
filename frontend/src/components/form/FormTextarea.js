import * as react from "react";

export const FormTextarea = (props) => {
  const { error, name, label, value, onChange } = props;
  const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);
  return (
    <>
      <label htmlFor={name}>{label}: </label>
      <textarea
        name={name}
        id={name}
        rows="5"
        cols="40"
        value={value}
        onChange={onChange}
      ></textarea>
      <span id={errorSpanId} className="errors-text">
        {error}
      </span>
    </>
  );
};
