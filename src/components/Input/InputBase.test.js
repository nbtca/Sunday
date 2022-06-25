import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import InputBase from "./InputBase.vue"

describe("first test", () => {

  it("should input id", async () => {
    const wrapper = mount(InputBase, {
      props: {
        placeholder: "ID"
      }
    })
    console.log(1, wrapper.text())
    expect(wrapper.text()).toContain("ID")
    expect(wrapper.text()).toBe('bar')

  })

})