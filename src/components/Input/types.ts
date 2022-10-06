interface Rule {
  rule: RegExp
  warning: string
}

interface InputProps {
  type?: string
  subject?: string
  required?: boolean
  center?: boolean
  hint?: string
  confirmBeforeInput?: boolean
  rules?: Rule[]
  maxLength?: string
  passWarning?: string
  passValue?: string
  content?: string | boolean | object
  placeholder?: string
}

export type { Rule, InputProps }
