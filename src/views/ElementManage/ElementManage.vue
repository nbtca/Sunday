<template>
  <div>
    <div class="flex justify-between px-4 py-5">
      <div class="text-4xl">成员管理</div>
      <div>
        <Menu as="div" class="text-left z-50">
          <div>
            <MenuButton
              class="
                btn
                flex
                justify-center
                items-center
                w-30
                text-primaryContent
                bg-primary
                focus-visible:ring-2 focus-visible:(ring-white
                ring-opacity-75)
              "
            >
              <PlusIcon
                class="w-5 h-5 mr-2 text-primaryContent"
                aria-hidden="true"
              />
              <div>添加成员</div>
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="
                absolute
                right-4
                w-40
                mt-2
                origin-top-right
                bg-white
                divide-y divide-gray-100
                rounded-md
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'text-primaryContent bg-primary'
                        : 'text-gray-900',
                      'group flex rounded-md items-center w-full h-full p-2 text-sm',
                    ]"
                  >
                    <UserAddIcon
                      :active="active"
                      class="w-5 h-5 mr-2 text-violet-300"
                      aria-hidden="true"
                    />
                    手动添加
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active
                        ? 'text-primaryContent bg-primary'
                        : 'text-gray-900',
                      'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                    ]"
                  >
                    <UploadIcon
                      :active="active"
                      class="w-5 h-5 mr-2 text-violet-300"
                      aria-hidden="true"
                    />
                    从表格导入
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
    <div class="">
      <div class="-my-2 overflow-x-auto">
        <div class="py-2 align-middle inline-block min-w-full">
          <div class="overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 text-center">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  ></th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    联系方式
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    身份
                  </th>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="element in elementList" :key="element.email">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          :src="element.ravatar"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ element.ralias }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ element.rid }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap">
                    <table>
                      <tr>
                        <td class="w-20">QQ</td>
                        <td>
                          {{ element.rqq }}
                        </td>
                      </tr>
                      <tr>
                        <td>手机</td>
                        <td>
                          {{ element.rphone }}
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        px-2
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-green-100
                        text-green-800
                      "
                    >
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      class="
                        px-2
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-green-100
                        text-green-800
                      "
                    >
                      Active
                    </span>
                    {{ element.role }}
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosApi from "../../axios/AxiosConfig";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { UploadIcon, PlusIcon, UserAddIcon } from "@heroicons/vue/outline";
export default {
  name: "ElementManage",
  setup() {},
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    PlusIcon,
    UserAddIcon,
    UploadIcon,
  },
  data() {
    return {
      elementList: [],
    };
  },
  async created() {
    await this.getElement();
  },
  methods: {
    async getElement() {
      await axiosApi("/elements", {}, "get").then((response) => {
        console.log(response.data);
        this.elementList = response.data;
      });
    },
  },
};
</script>

<style></style>
