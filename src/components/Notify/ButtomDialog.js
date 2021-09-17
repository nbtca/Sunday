import { h, render } from "vue";
import BottomDialog from "./BottomDialog.vue";
// import InputBase from "../Input/InputBase.vue";
const divVNode = h("div");
render(divVNode, document.body);
// 🔔 虚拟DOM(对象)成功写入到页面后，可通过 el 属性获取到真实DOM节点
const div = divVNode.el;
// console.log('虚拟DOM', divVNode)
// console.log('真实DOM', div)

const CallBottomDialog = () => {
  // 1. 动态创建虚拟DOM  -  createVNode(h) 函数
  const comVNode = h(BottomDialog);
  // 2. 渲染到body页面中 -  render 函数
  // render(comVNode, document.body)
  console.log(comVNode.type.methods.openModal);
  comVNode.type.methods.openModal({ subject: "123" });
  render(comVNode, div);

  // 3.提示在 3s 后自动卸载
  setTimeout(() => {
    render(null, div);
  }, 3000);
};

export default CallBottomDialog;
