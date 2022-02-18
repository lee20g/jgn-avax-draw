import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

// import nft_list from '@/views/nft_list/index.vue'
// import nft from '@/views/nft/index.vue'
// import nftMy from '@/views/nft_my/index.vue'
import card_list from '@/views/card_list/index.vue'
import draw from '@/views/draw/index.vue'
import exchange from '@/views/exchange/index.vue'
import card_my from '@/views/card_my/index.vue'
import about from '@/views/about/index.vue'
// import referral from '@/views/referral/index.vue'

import home from '@/views_v2/home/index.vue'
import my_collection from '@/views_v2/my_collection/index.vue'
import reward from '@/views_v2/reward/index.vue'
import game_rule from '@/views_v2/game_rule/index.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

  // old routers
  {
    path: "/v1",
    name: "card_list",
    component: card_list
  },
  {
    path: "/v1/draw",
    name: "draw",
    component: draw
  },
  {
    path: "/v1/exchange",
    name: "exchange",
    component: exchange
  },
  {
    path: "/v1/card_my",
    name: "card_my",
    component: card_my
  },
  {
    path: "/v1/about",
    name: "about",
    component: about
  },

  {
    path: "/",
    name: "home",
    component: home
  },
  {
    path: "/my_collection",
    name: "my_collection",
    component: my_collection
  },
  {
    path: "/rewards",
    name: "reward",
    component: reward
  },
  {
    path: "/game_rules",
    name: "game_rule",
    component: game_rule
  },

  {
    path: "/draw",
    name: "draw",
    component: draw
  },
  {
    path: "/exchange",
    name: "exchange",
    component: exchange
  },
  
  {
    path: "/about",
    name: "about",
    component: about
  },

  // {
  //   path: "/referral",
  //   name: "referral",
  //   component: referral
  // },
  // {
  //   path: "/playpage",
  //   name: "playpage",
  //   component: playpage
  // },

  {
    path: "/*",
    name: "error-404",
    beforeEnter: (to, from, next) => next("/")
  }
];

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  // base: '/stakingv4/',
  // base: '/thuggerdraw/',
  routes
});

export default router;
