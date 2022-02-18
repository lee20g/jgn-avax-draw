<template>
  <div 
    id="app" 
    :key="app_key" 
    :class="['overflow-hidden', 'app-theme-box',app_theme]"
    >
    <UiLoading v-if="0 && (ui.loading || !ui.init)" class="overlay big" />
    <div v-else>
      <Topnav />
      <div class="pb-6 overflow-hidden">
        <router-view :key="$route.path" class="flex-auto" />
      </div>
    </div>
    <Notifications />
    <storeWatch/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
//import spaces from '@/spaces';
import storeWatch from './views/storeWatch.vue'

export default {
  components: {
    storeWatch
  },
  data(){
    return {
      app_key: 0,
      app_theme: '',
    }
  },
  computed: {
    wrongNetwork() {
      return this.config.chainId !== this.web3.injectedChainId;
    },
    showLogin() {
      return (
        (!this.web3.account && !this.web3.injectedLoaded) ||
        (!this.web3.account && !this.wrongNetwork)
      );
    },
    /*
    space() {
      try {
        return spaces[this.$route.params.key];
      } catch (e) {
        return {};
      }
    }
    */
  },
  watch: {
    '$store.state.app.lang'(val,old_val){
      this.app_key += 1
    },
    '$route.path': {
      immediate: true,
      handler(val){
        let v = this
        if(val.indexOf('/nft2')>=0){
          // v.app_theme = 'sp-nft2'
        }else{
          v.app_theme = ''
        }
      },
    },
    '$store.state.web3.account'(){
      this.app_key+=1
    },
  },
  methods: {
    ...mapActions(['init']),

    reloadApp(){
      this.app_key += 1
      this.$store.hotUpdate()
    },
    checkReferral(){
      let v = this
      
      if(v.$route.query.referral){
        v.$store.commit('setWeb3Data',{
          referral_address: v.util.base32decode(v.$route.query.referral)
        })
      }
    },
  },
  mounted() {
    this.init();
    this.checkReferral()
    window.appvue = this
  },
  
};
</script>
<style lang="scss">
  @import '~@/assets/css/style.scss';
</style>
