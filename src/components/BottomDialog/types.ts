import type { InjectionKey } from "vue"
import type { InputProps, Rule } from "../Input/types"

type Content = {
  key: string
  value?: string
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
  rules?: Rule[]
  value?: string
}

interface BottomDialogConfig {
  subject?: string
  description?: string
  content?: Content[]
  formList?: InputProps[]
  confirmMessage?: string
  acceptActionName?: string
  acceptAction?: (e: any) => Promise<any>
  declineActionName?: string
  declineAction?: (e: any) => Promise<any>
  btnClass?: string
  rounded?: true
}

type BottomDialogType = (config: BottomDialogConfig) => Promise<any>

const BottomDialogInjectionKey = Symbol() as InjectionKey<(config: BottomDialogConfig) => Promise<unknown>>

export type { BottomDialogConfig, Content, FormItem, BottomDialogType }
export { BottomDialogInjectionKey }
