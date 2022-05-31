import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import HomeViewAuth from '../views/HomeViewAuth.vue'
import FavoriteViewAuth from '../views/FavoriteViewAuth.vue'

const routes = [{
        path: '/',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: LogInView
    },
    {
        path: '/signup',
        name: 'signup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: SignUpView
    },
    {
        path: '/auth',
        name: 'auth',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: HomeViewAuth
    }, {
        path: '/auth/favorite',
        name: 'auth/favorite',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: FavoriteViewAuth
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router