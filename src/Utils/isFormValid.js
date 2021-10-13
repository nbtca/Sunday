const isFormValid = form => {
  for (let item in form) {
    if (form[item] === false) {
      return false;
    }
  }
  return form;
};
export { isFormValid };
