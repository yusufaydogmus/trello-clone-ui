import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {appAxios} from './utils/appAxios'
import store from "./store/store"
import router from "./router/index.ts"

const app=createApp(App)
app.use(store);
app.use(router);
app.config.globalProperties.$appAxios=appAxios;

app.provide("appAxios",appAxios);
app.mount('#app')
