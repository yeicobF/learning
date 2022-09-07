import { createApp } from "vue";
import App from "./App.vue";
import BoilerplatePlugin from "./plugins/BoilerplatePlugin";
import { createPinia } from "pinia";

// Init App
createApp(App).use(BoilerplatePlugin).use(createPinia()).mount("#app");
