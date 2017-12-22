// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods.vue';
import seller from './components/seller/seller.vue';
import ratings from './components/ratings/ratings.vue';

import './common/stylus/index.styl'
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
/*
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
*/
//1定义（路由组件）
/*const Goods={template:'<div>goods</div>'}
const Ratings={template:'<div>ratings</div>'}
const Seller={template:'<div>seller</div>'}*/
//2定义路由
const routes=[
  {path:'/goods',component:goods},
  {path:'/ratings',component:ratings},
  {path:'/seller',component:seller},
  //设置默认路由地址
  {path:'/',component:goods}
];
//3创建router实例，然后传'router'配置
const router=new VueRouter({
  routes:routes,
  linkActiveClass:'active'
})
//4创建和挂载根实例
const app=new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

