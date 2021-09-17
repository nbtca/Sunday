<template>
  <div class="h-full">
    <div class="hidden sm:block">
      <div class="flex w-full p-8 pb-2 justify-between">
        <div class="textHeading">成员管理</div>
        <div>
          <Menu as="div" class="z-50">
            <div>
              <MenuButton class="bg-primary flex text-primaryContent w-30 btn justify-center items-center">
                <PlusIcon class="h-5 text-white mr-2 w-5" />
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
                  divide-y
                  bg-white
                  rounded-md
                  divide-gray-100
                  shadow-lg
                  ring-black
                  mt-2
                  origin-top-right
                  right-4
                  ring-1 ring-opacity-5
                  w-40
                  absolute
                  focus:outline-none
                "
              >
                <div class="py-1 px-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="addElement"
                      :class="[
                        active ? 'text-primaryContent bg-primary' : '',
                        'group flex rounded-md items-center w-full h-full p-2 text-sm',
                      ]"
                    >
                      <UserAddIcon :active="active" class="h-5 mr-2 text-violet-300 w-5" aria-hidden="true" />
                      手动添加
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'text-primaryContent bg-primary' : '',
                        'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      ]"
                    >
                      <UploadIcon :active="active" class="h-5 mr-2 text-violet-300 w-5" aria-hidden="true" />
                      从表格导入
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <div class="w-full py-2 align-middle">
        <table class="divide-y divide-gray-200 w-full">
          <thead class="">
            <tr>
              <th scope="col" class="py-3 px-6 textDescription whitespace-nowrap"></th>
              <th scope="col" class="py-3 px-6 textDescription whitespace-nowrap">联系方式</th>
              <th scope="col" class="py-3 px-6 textDescription whitespace-nowrap">完成事件数</th>
              <th scope="col" class="py-3 px-6 textDescription whitespace-nowrap">状态</th>
              <th scope="col" class="py-3 px-6 textDescription whitespace-nowrap">创建日期</th>
              <th scope="col" class="py-3 px-6">
                <span>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y bg-white h-screen divide-base-standout overflow-auto">
            <tr v-for="element in elementList" :key="element.email">
              <td class="tableCell">
                <div class="flex items-center">
                  <div class="border rounded-full flex-shrink-0 h-14 w-14 hidden relative overflow-hidden lg:block">
                    <img v-if="element.ravatar" class="object-fill absolute" :src="element.ravatar" alt="" />
                    <UserIcon v-if="!element.ravatar" class="bg-base-standout object-fill p-1" />
                  </div>
                  <div class="flex flex-col ml-4 items-start">
                    <div class="inline-flex items-center">
                      <div class="font-medium text-lg tracking-wider">
                        {{ element.ralias || "null" }}
                      </div>
                      <span v-if="element.role == 2" class="bg-green-100 text-green-800 badge"> 管理员 </span>
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
              <td class="font-medium text-right text-sm tableCell">
                <a href="#" class="textLink">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="sm:hidden">
      <div
        class="flex flex-col-reverse w-full px-2 overflow-auto"
        style="height: 100vh"
        :style="[isSafari ? '' : 'height: calc(var(---vh, 1vh) * 100)']"
      >
        <div v-for="element in elementList" :key="element.rid" class="cellsm overflow-visible">
          <div class="flex">
            <div class="border rounded-full flex-shrink-0 h-14 w-14 relative overflow-hidden">
              <img v-if="element.ravatar" class="object-fill object-center z-0 absolute" :src="element.ravatar" alt="" />
              <UserIcon v-if="!element.ravatar" class="m-1" />
            </div>
            <div class="flex flex-col text-left ml-2 items-start justify-center">
              <div class="flex items-center">
                <div class="font-semibold text-base leading-tight">
                  {{ element.ralias || "null" }}
                </div>
                <span v-if="element.role == '2'" class="bg-green-100 h-5 text-green-800 badge"> 管理员 </span>
              </div>
              <div>
                <div class="text-xs textDescription">
                  {{ element.rid }}
                </div>
                <div class="text-xs textDescription">
                  {{ element.gmt_modified }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col h-full justify-center items-center">
            <!-- <button class="bg-green-500 btnxs">修改</button> -->
            <button class="bg-warning text-warningContent btnxs">删除</button>
          </div>
        </div>
        <div class="py-14"></div>
      </div>
      <div class="border-t flex h-12 w-full py-2 px-1 items-center">
        <input
          type="text"
          class="border-base-standout rounded-lg h-10 shadow-inner my-0.5 mx-0.5 text-center w-[80vw]"
          placeholder="搜索"
        />
        <button class="flex h-8 mx-1 w-8 justify-center items-center">
          <UploadIcon class="h-5 text-gray-900 w-5" />
        </button>
        <button
          class="rounded-lg flex h-8 mx-1 w-8 justify-center items-center focus:(shadow-inner outline-none)"
          @click="addElementByBottomDialog"
        >
          <PlusIcon class="h-5 text-gray-900 w-5" />
        </button>
      </div>
    </div>
    <bottom-dialog ref="BottomDialogAdd" :parms="newElement">
      <template #body>
        <form action="" class="mx-3">
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
        </form>
      </template>
    </bottom-dialog>
    <Dialog focus ref="Dialog" :parms="newElement">
      <template #body>
        <form @submit="submit" @close="$refs.Dialog.closeModal()" class="">
          <div class="grid gap-1 sm:gap-3">
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
          <div class="flex mt-4 justify-center">
            <button class="bg-warning mx-5 text-warningContent text-sm btn" type="close" @click="$refs.Dialog.closeModal()">取消</button>
            <button class="bg-primary mx-5 text-primaryContent text-sm btn" type="submit">确认</button>
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
import BottomDialog from "@/components/Dialog/BottomDialog.vue";
import isValid from "@/Utils/isValid.js";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { UserIcon, UploadIcon, PlusIcon, UserAddIcon } from "@heroicons/vue/outline";
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
    BottomDialog,
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
      isSafari: false,
    };
  },
  watch: {},
  computed: {},
  async created() {
    var userAgent = navigator.userAgent;
    this.isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("---vh", `${vh}px`);
    await this.setElement();
  },
  methods: {
    submit() {
      let tmp = isValid(this.newElement);
      console.log(tmp);
      if (tmp) {
        Element.create(tmp).then(res => {
          this.$refs.Dialog.closeModal();
          this.setElement();
        });
      }
    },
    async setElement() {
      Element.get().then(res => {
        console.log(res.data);
        this.elementList = res.data;
      });
    },
    addElement() {
      this.$refs.Dialog.openModal({ heading: "添加成员" })
        .then(async () => {})
        .catch(() => {});
    },
    addElementByBottomDialog() {
      this.$refs.BottomDialogAdd.openModal({ subject: "添加成员", actionName: "确定" }, function () {
        return e => {
          console.log(e);
          let res = isValid(e);
          return Element.create(res);
        };
      })
        .then(() => {
          this.setElement();
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
