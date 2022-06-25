import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "virtual:windi.css"

const app = createApp(App)

import BottomDialog from "@/components/BottomDialog"
import Notify from "@/components/Notify"

app.provide("BottomDialog", BottomDialog)
app.provide("Notify", Notify)

app.use(router).mount("#app")
