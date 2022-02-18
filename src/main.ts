import Vue from 'vue';
import autofocus from 'vue-autofocus-directive';
import infiniteScroll from 'vue-infinite-scroll';
import TextareaAutosize from 'vue-textarea-autosize';
import Jazzicon from 'vue-jazzicon';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import mixins from '@/mixins';
import i18n from '@/i18n';
import '@/auth';
import sitecfg from '@/sitecfg.js';

Vue.use(infiniteScroll);
Vue.use(TextareaAutosize);

// window.web3read = new Web3('https://mainnet.infura.io/v3') //kk

// 注册全局组件
const requireComponent = require.context('@/components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

// 多语言处理
window.lang = sitecfg.default_lang || 'en'
import web_lang from "./lang/lang.js";
window.web_lang = web_lang;
import langMethods from './lang/index.js'
Vue.prototype.lg = langMethods.lg
Vue.prototype.lgRefer = langMethods.lgRefer

// filter
import filter from './filter/'
for (let key in filter) {
  Vue.filter(key, filter[key])
}

// 插件
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
import Toasted from 'vue-toasted';
Vue.use(Toasted,{
  duration: 1500,
  theme: 'outline',
  position: 'bottom-left',
})

Vue.component('jazzicon', Jazzicon);
Vue.mixin(mixins);
Vue.directive('autofocus', autofocus);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
