import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Login from "./Login.vue"

describe("first test", () => {
  it("should pass", () => {
    const wrapper = mount(Login)
    expect(wrapper.find("div"))
  })

  it("should input id", async () => {
    const wrapper = mount(Login)

    // await wrapper.find("InputBase").setValue("123123")
    // await wrapper.find("InputBase").trigger("blur")
    expect(wrapper.find("from").text()).toContain("格式错误")
  })

})