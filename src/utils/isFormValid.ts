type FormValues<T> = {
  [K in keyof T]: T[K] | boolean
}

const isFormValid = <T extends Record<string, unknown>>(form: FormValues<T>) => {
  for (const item in form) {
    if (form[item] === false) {
      return false
    }
  }
  return form as { [K in keyof T]: T[K] }
}

export { isFormValid }
