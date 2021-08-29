export default function (e) {
  let ans = {};
  for (let item of Object.keys(e)) {
    if (e[item].isVaild == false) {
      ans = false;
      break;
    } else {
      ans[item] = e[item].value;
    }
  }
  return ans;
}
