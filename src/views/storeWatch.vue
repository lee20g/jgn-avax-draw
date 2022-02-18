<template>
  <div>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'storeWatch',
  components: {},
  props: [],
  data() {
    return {
      
    }
  },
  computed: {},
  watch: {
    '$store.state.web3.account'(val,old_val){
      if(old_val){
        this.$parent.reloadApp()
      }
    },
  },
  methods: {
    // ...mapActions(['getAddressETHBalance']),

    // async updateUserBalance(val){
    //   let v = this
    //   if(val){
    //     console.log('gaga')
    //     console.log(val)
    //     v.$store.commit('setWeb3Data',{
    //       account_balance_eth: await v.getAddressETHBalance(val),
    //     })
    //   }
    // },
  },
  created() {
    
  },
  //mounted() {},
  //beforeDestroy() {},
  //update() {},
  //activited() {},
  //beforeRouteUpdate() {},
  //filters: {},
};
</script>

<style lang="scss" scoped>
  
</style>