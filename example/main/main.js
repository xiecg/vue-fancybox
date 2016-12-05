import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

import baseUsage from './component/baseUsage.vue';
import fancyboxThumbnail from './component/fancyboxThumbnail.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/baseUsage',
      component: baseUsage
    },
    {
      path: '/fancyboxThumbnail',
      component: fancyboxThumbnail
    }
  ]
})

const app = new Vue({
  router: router,
  render: render => render(App)
}).$mount('#app')
