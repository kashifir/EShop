import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login"
import register from "../components/register"
import produit from "../views/produit"
import panier from "../views/panier"
import paypal from "../components/Paypal"
import profile from "../components/profile"



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: produit
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/panier',
    name: 'panier',
    component: panier
  },
  {
    path: '/paypal',
    name: 'paypal',
    component: paypal
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
