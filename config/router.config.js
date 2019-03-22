/**
 * Created by zhy on 2019/3/20.
 */

export default [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        { path: '/user', redirect: '/user/login' },
        { path: '/user/login',name:'login',component: './User/Login'},
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/home' },
        {
          path: '/home',
          name: 'home',
          icon: 'smile',
          hideInMenu:true,
          component: './Home',
        },
        {
          path: '/order',
          icon: 'smile',
          name: 'order',
          routes:[
            {
              path: '/order/enter',
              name: 'order-enter',
              component: './Order/Enter',
            },
          ],
        },
        {
          path: '/test',
          name:  'test',
          icon:  'smile',
          routes: [
            {
              path:'/test/test',
              name:'test-1',
              component: './Test/test',
            },
          ],
        },
        {
          path: 'https://github.com/ZouHuaYi',
          name: 'more-blocks',
          icon: 'block',
        },
      ],
    },
]

