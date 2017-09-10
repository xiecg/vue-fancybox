import Vue from 'vue'
import Router from 'vue-router'

import baseUsage from '@/components/baseUsage.vue'
import fancyboxThumbnail from '@/components/fancyboxThumbnail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      alias: '/',
      path: '/baseUsage',
      name: 'baseUsage',
      component: baseUsage
    },
    {
      path: '/fancyboxThumbnail',
      name: 'fancyboxThumbnail',
      component: fancyboxThumbnail
    }
  ]
})
