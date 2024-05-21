import { createRouter, createWebHistory } from 'vue-router';
import Home from '../home.vue';
import Carts from '../Carts.vue';
import Table from '../components/table.vue/table.vue';


const routes = [
  { path: '/',name:'home',component: Home },
  { path: '/carts',name:'carts',component: Carts },
  { path: '/table',name:'table',component: Table },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
