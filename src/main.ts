import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "virtual:windi.css"
import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

import BottomDialog from "@/components/BottomDialog"
import Notify from "@/components/Notify"

app.provide("BottomDialog", BottomDialog)
app.provide("Notify", Notify)

app.use(pinia)
app.use(router)

app.mount("#app")
