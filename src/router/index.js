import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos.vue'
import Goods from '@/components/page/Goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
