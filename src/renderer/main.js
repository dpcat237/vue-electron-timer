import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import './assets/style/app.global.scss'

import App from './App'
import router from './router'
import store from './store/store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const vuetifyOptions = {}
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  vuetify: new Vuetify(vuetifyOptions),
  icons: {
    iconfont: 'faSvg',
  },
}).$mount('#app')
