import { createMemoryHistory, createRouter } from 'vue-router'

import table from '../table.vue'

const routes = [
  { path: '/', component: table },
//   { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;