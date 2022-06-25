const isFormValid = form => {
  for (const item in form) {
    if (form[item] === false) {
      return false
    }
  }
  return form
}

export { isFormValid }
