<template>
  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex p-1 bg-gray-50 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
          v-for="item in Object.keys(filterlist)"
          as="template"
          :key="item"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ item }}
          </button>
        </Tab>
      </TabList>
    </TabGroup>
  </div>
</template>

<script>
import { ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

export default {
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  setup() {
    let filterlist = ref({
      Mine: { name: "mine" },
      ALL: { name: "ALL" },
    });
    
    return {  filterlist };
  },
};
</script>
