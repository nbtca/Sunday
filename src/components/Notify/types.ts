import type { InjectionKey } from "vue"

type NotifyType = (type: string, content: string) => void

const NotifyInjectionKey = Symbol("NotifyInjectionKey") as InjectionKey<NotifyType>

export type { NotifyType }
export { NotifyInjectionKey }
