import camelCase from 'lodash/camelCase';

import sitecfg from '@/sitecfg.js'

const requireModule = require.context('.', false, /\.ts$/);
const modules = {
  app: {
    state: {
      lang: sitecfg.default_lang || "en",
    },
    mutations: {
      lang(state, str) {
        state.lang = str;
      },
      setAppKey(state, obj) {
        for (let key in obj) {
          state[key] = obj[key];
        }
      },
    },
  },
};

requireModule.keys().forEach(fileName => {
  if (fileName === './index.ts') return;
  const moduleName = camelCase(fileName.replace(/(\.\/|\.ts)/g, ''));
  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
