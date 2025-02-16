import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "virtual:windi.css"
import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persistedstate"
import BottomDialog from "@/components/BottomDialog"
import Notify from "@/components/Notify"
import { BottomDialogInjectionKey } from "./components/BottomDialog/types"
import { NotifyInjectionKey } from "./components/Notify/types"
import { createLogto, type LogtoConfig } from "@logto/vue"

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.provide(BottomDialogInjectionKey, BottomDialog)
app.provide(NotifyInjectionKey, Notify)

app.use(pinia)
app.use(router)

const config: LogtoConfig = {
  endpoint: import.meta.env.VITE_LOGTO_ENDPOINT,
  appId: import.meta.env.VITE_LOGTO_APP_ID,
  resources: [import.meta.env.VITE_LOGTO_RESOURCE],
  scopes: ["email", "custom_data", "roles"],
}

app.use(createLogto, config)
app.mount("#app")
