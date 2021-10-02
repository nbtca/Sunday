import { h, render } from "vue";
import BottomDialogCustom from "./BottomDialogCustom.vue";

const divVNode = h("div", { class: "fixed inset-x-0 bg-black bottom-0 z-50" });

const BottomDialog = config => {
  render(divVNode, document.body);
  const div = divVNode.el;

  config.parentNode = div;
  const comVNode = h(BottomDialogCustom, config);

  render(comVNode, div);
  return new Promise((resolve, reject) => {
    div.addEventListener("close", e => {
      setTimeout(() => {
        render(null, div);
      }, 200);
      resolve();
    });
  });
};

export default BottomDialog;
