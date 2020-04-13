import Router from 'vue-router'

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
  ],
})

export default router
