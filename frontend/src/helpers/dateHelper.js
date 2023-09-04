export const getFormattedDate = (dateSource) => {
  try {
    return new Date(dateSource).toISOString().replace("T", " ").slice(0, -8);
  } catch (e) {
    return "";
  }
};
