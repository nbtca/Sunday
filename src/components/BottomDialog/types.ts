type Content = {
  key: string
  value: string
}
interface FormItem {
  id: string
  subject: string
  name?: string
  required?: boolean
  type?: string
  placeholder?: string
  maxLength?: number
  hint?: string
  rules?: string[]
  val?: string
}

interface BottomDialogConfig {
  subject?: string
  description?: string
  content?: Content[]
  formList?: FormItem[]
  confirmMessage?: string
  acceptActionName?: string
  acceptAction?: (e: any) => Promise<any>
  declineActionName?: string
  declineAction?: (e: any) => Promise<any>
  btnClass?: string
  rounded?: true
}

export type { BottomDialogConfig, Content, FormItem }
