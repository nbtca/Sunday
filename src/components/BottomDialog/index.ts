import { h, render } from "vue"
import BottomDialogCustom from "./BottomDialogCustom.vue"
import type { BottomDialogConfig } from "./types"

const divVNode = h("div", { class: "fixed inset-x-0 bottom-0 z-50" })
const BottomDialog = (config: BottomDialogConfig) => {
  render(divVNode, document.body)
  const div = divVNode.el

  let c = Object.assign(config, {
    parentNode: div,
  })

  const comVNode = h(BottomDialogCustom, c)

  render(comVNode, div)
  return new Promise(resolve => {
    div.addEventListener("close", e => {
      setTimeout(() => {
        render(null, div)
      }, 200)
      if (e.detail.event == "cancel") {
        // reject();
        return 0
      } else {
        resolve(null)
      }
    })
  })
}

export default BottomDialog
