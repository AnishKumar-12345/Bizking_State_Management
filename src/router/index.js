import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },       
    ...setupLayouts(routes),   
    // { path: '/default', component: 'Default' },
    // { path: '/login', component: Login },
  ],
  base: import.meta.env.BASE_URL,
  scrollBehavior() { 
    return { top: 0 }
  },
})
export default router
