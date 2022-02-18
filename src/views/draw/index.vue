<template>
  <div class="container px-4 tac">

    <div class="mt-5">
      <h1 style="font-size: 3em;">
        {{lg('',{
          en: '50 JGN',
          zh: '',
        })}}
      </h1>
      <h6 class="mt-3">
        {{lg('',{
          en: 'My balance',
          zh: '我的余额',
        })}}:
        {{$store.state.web3.account_balance_jgn | tofixed2 | qfw}} JGN
      </h6>
    </div>

    <div class="my-5 mt-5">

      <button  
        v-if="!$store.state.web3.status_account_approved_jgn"
        :class="['btn btn-primary btn-lg']"
        style="min-width: 150px;" 
        @click="approveJgn()" 
        >
        Approve
      </button>
      <button 
        v-else 
        class="btn btn-primary btn-lg" 
        style="min-width: 150px;" 
        @click="drawBtn()"
        >
        {{lg('',{
          en: 'Draw',
          zh: '抽奖',
        })}}
      </button>

    </div>

    <!-- 20201202 隐藏 -->
    <!-- <div class="py-5 d-flex mx-auto" style="max-width: 700px;">
      
      <div class="input-group">
        <input type="text" v-model="input_num" class="form-control" style="border-right: none;" placeholder="">
        <div class="input-group-append" style="border-left: none;">
          <span class="input-group-text cd">
            JGN
          </span>
        </div>
        <div class="input-group-append" style="border-left: none;">
          <span @click="setInputNum($store.state.web3.account_balance_jgn)" class="input-group-text bg-light c cp">
            Max
          </span>
        </div>
      </div>


      <button  
        v-if="!$store.state.web3.status_account_approved_jgn"
        @click="approveJgn()" 
        :class="['btn btn-primary ml-3']"
        >
        Approve
      </button>
      <button v-else class="btn btn-primary ml-3" style="min-width: 100px;" @click="draw()">
        {{lg('',{
          en: 'Draw',
          zh: '抽奖',
        })}}
      </button>
    </div> -->

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'draw',
  components: {},
  props: [],
  data() {
    return {

      input_num: '',
    }
  },
  computed: {},
  watch: {
    '$store.state.web3.account_balance_jgn'(val){
      this.setInputNum(val)
    },
    '$store.state.web3.account'(val){
      this.run()
    }
  },
  methods: {
    ...mapActions([
      'hasApproveJGN',
      'approveJGN',
      'getJGNBalance',
      'draw',
    ]),

    approveJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){ 
        bus.topnavvue.modalOpen = true
        return 
      }

      v.approveJGN()
    },

    async checkApproveJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark = await v.hasApproveJGN(address_my)
      console.log('hasApproveJGN() res:',mark)
      v.$store.commit('setWeb3Data',{
        status_account_approved_jgn: mark
      })
    },

    setInputNum(num){
      let v = this
      if(num !== undefined){
        v.input_num = num
      }
    },

    async getBalanceJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark =  await v.getJGNBalance(address_my)
      v.num_jgn_balance = mark
      v.$store.commit('setWeb3Data',{
        account_balance_jgn: mark,
      })
    },

    async drawBtn(){
      await this.draw()
    },

    run(){
      if(!this.$store.state.web3.account){
        return
      }
      this.checkApproveJgn()
      this.getBalanceJgn()
    },
  },
  created() {
    this.run()
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