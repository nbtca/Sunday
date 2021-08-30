<template>
  <div>
    <div class="flex justify-between w-full p-8 pb-2">
      <div class="textHeading">成员管理</div>
      <div>
        <Menu as="div" class="z-50">
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
              "
            >
              <PlusIcon class="text-white w-5 h-5 mr-2" />
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
                    @click="addElement"
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
    <div class="py-2 align-middle w-full">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 textDescription whitespace-nowrap"
            ></th>
            <th scope="col" class="px-6 py-3 textDescription whitespace-nowrap">
              联系方式
            </th>
            <th scope="col" class="px-6 py-3 textDescription whitespace-nowrap">
              完成事件数
            </th>
            <th scope="col" class="px-6 py-3 textDescription whitespace-nowrap">
              状态
            </th>
            <th scope="col" class="px-6 py-3 textDescription whitespace-nowrap">
              创建日期
            </th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="element in elementList" :key="element.email">
            <td class="tableCell">
              <div class="flex items-center">
                <div
                  class="
                    hidden
                    lg:block
                    relative
                    flex-shrink-0
                    h-14
                    w-14
                    rounded-full
                    border
                    overflow-hidden
                  "
                >
                  <img
                    v-if="element.ravatar"
                    class="absolute object-fill"
                    :src="element.ravatar"
                    alt=""
                  />
                  <UserIcon
                    v-if="!element.ravatar"
                    class="object-fill p-1 bg-base-standout"
                  />
                </div>
                <div class="ml-4 flex flex-col items-start">
                  <div class="inline-flex items-center">
                    <div
                      class="text-lg font-medium tracking-wider text-gray-900"
                    >
                      {{ element.ralias || "null" }}
                    </div>
                    <span
                      v-if="element.role == 2"
                      class="badge bg-green-100 text-green-800"
                    >
                      管理员
                    </span>
                  </div>
                  <div class="textDescription">
                    {{ element.rid }}
                  </div>
                </div>
              </div>
            </td>
            <td class="tableCell">
              <table class="w-full">
                <tr>
                  <td class="w-20">QQ</td>
                  <td class="text-left">
                    {{ element.rqq || "null" }}
                  </td>
                </tr>
                <tr>
                  <td>手机</td>
                  <td class="text-left">
                    {{ element.rphone || "null" }}
                  </td>
                </tr>
              </table>
            </td>
            <td class="tableCell">
              {{ element.event_count }}
            </td>
            <td class="tableCell">{{ element.isActivated }}</td>
            <td class="tableCell">
              {{ element.gmt_modified }}
            </td>
            <td class="tableCell text-right text-sm font-medium">
              <a href="#" class="textLink">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Dialog focus ref="Dialog">
      <template #entire>
        <div class="text-2xl">添加成员</div>
        <form @submit="submit" @close="$refs.Dialog.closeModal()" class="mt-5">
          <div class="grid gap-3">
            <InputBase
              placeholder=""
              hint="学号"
              required
              subject="ID"
              v-model:content="newElement.rid"
              :rules="[{ rule: /^\d{10}$/, warning: '格式错误' }]"
            />
            <InputBase
              placeholder=""
              subject="姓名"
              v-model:content="newElement.name"
              :rules="[{ rule: /^[\u4e00-\u9fa5]{2,4}$/, warning: '格式错误' }]"
            />
            <InputBase
              placeholder=""
              subject="班级"
              hint="示例: 计算机196"
              v-model:content="newElement.class"
              :rules="[
                {
                  rule: /^([\u4e00-\u9fa5]{2,10})(\d{3})$/,
                  warning: '格式错误',
                },
              ]"
            />
          </div>
          <div class="mt-4 flex justify-center">
            <button
              class="btn bg-warning text-warningContent mx-5 text-sm"
              type="close"
              @click="$refs.Dialog.closeModal()"
            >
              取消
            </button>
            <button
              class="btn bg-primary text-primaryContent mx-5 text-sm"
              type="submit"
            >
              确认
            </button>
          </div>
        </form>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { Element } from "@/api/api";
import Dialog from "@/components/Dialog/Dialog.vue";
import InputBase from "@/components/Input/InputBase.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  UserIcon,
  UploadIcon,
  PlusIcon,
  UserAddIcon,
} from "@heroicons/vue/outline";
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
    UserIcon,
    Dialog,
    InputBase,
  },
  data() {
    return {
      newElement: {
        rid: {},
        name: {},
        class: {},
      },
      elementList: [],
    };
  },
  computed: {
    isNewElementValid() {
      let ans = {};
      for (let item of Object.keys(this.newElement)) {
        if (this.newElement[item].isVaild == false) {
          ans = false;
          break;
        } else {
          ans[item] = this.newElement[item].value;
        }
      }
      return ans;
    },
  },
  async created() {
    await this.setElement();
  },
  methods: {
    async submit() {
      let tmp = this.isNewElementValid;
      console.log(tmp);
      if (tmp) {
        await Element.create(tmp).then(async (res) => {
          this.$refs.Dialog.closeModal();
          await this.setElement();
        });
      }
    },
    async setElement() {
      await Element.get().then((res) => {
        console.log(res.data);
        this.elementList = res.data;
      });
    },
    addElement() {
      this.$refs.Dialog.openModal()
        .then(async () => {})
        .catch(() => {});
    },
  },
};
</script>

<style></style>
