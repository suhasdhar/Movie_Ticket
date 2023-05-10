import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/book-tickets',
      name: 'book-tickets',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/add-movie-review',
      name: 'add-movie-review',
      component:   () => import('../components/AddMovieReview.vue')
    },
    {
      path: '/add-upcoming-movie',
      name: 'add-upcoming-movie',
      component:  () => import('../components/AddUpcomingMovie.vue')
    },
    {
      path: '/reviews',
      name: 'reviews',
      component:  () => import('../components/MovieReview.vue')
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component:  () => import('../components/UpcomingMovies.vue')
    },
  ]
})

export default router
