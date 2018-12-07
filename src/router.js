import Vue from 'vue';
import Router from 'vue-router';
import Feed from './views/Feed.vue';
import Auth from './views/Auth.vue';
import Settings from './views/Settings.vue';

import store from './store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requireAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  console.log(store);
  if (to.meta.requireAuth) {
    if (store.state.user) {
      next();
    } else {
      next({ name: 'auth' });
    }
  } else {
    next();
  }
  
})

export default router;
