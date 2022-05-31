import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import axios from 'axios'
import VueAxios from 'vue-axios'


axios.defaults.withCredentials = true
createApp(App).use(VueCookies).use(VueAxios, axios).use(store).use(router).mount('#app')