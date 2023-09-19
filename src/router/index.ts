import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'welcome',
    meta:{
      title:'首页'
    },
    children:[
      {
        path:'welcome',
        component:()=> import('../views/welcome.vue'),
        meta:{
          title:'欢迎页面'
        },
      },
      {
        path:'goods',
        component:()=> import('../views/goods.vue'),
        meta:{
          title:'商品列表'
        },
      },
      {
        path:'categories',
        component:()=>import('../views/categories.vue'),
        meta:{
          title:'商品参数'
        },
      },
      {
        path:'goodsAdd',
        component:()=> import('../views/goodsAdd.vue'),
        meta:{
          title:'商品列表'
        },
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
  },
  {
    path:'/:pathMatch(.*)*',
    component:()=>import('../views/no.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('token')
  if(!token && to.path !== '/login'){
    next('/login')
  }else if(token && to.path === '/login'){
    next('/')
  }else{
    next()
  }
})

export default router
