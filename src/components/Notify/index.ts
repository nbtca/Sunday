import { h, render } from "vue"
import notifyBase from "./NotifyBase.vue"

const divVNode = h("div", { class: "fixed inset-x-0 top-0" })
render(divVNode, document.body)
const div = divVNode.el

const Notify = (type: string, content: string) => {
  const comVNode = h(notifyBase, { type: type, content: content })
  if (div != null) {
    render(comVNode, div)
    setTimeout(() => {
      render(null, div)
    }, 3500)
  }
}

export default Notify
