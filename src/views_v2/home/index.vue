<template>
  <div class="container px-4 tac">

    <!-- main logo -->
    <div class="block-main-theme-logo">
      <div class="pic-title">
        <img src="~@/assets/static/img/css_img/bg_theme_logo_text-thuggerdraw.png">
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-center py-4">
      <div class="ui-bg-card lg bg-box-chest">
        <div class="card-pic"></div>
      </div>

      <div class="d-flex px-4 align-items-center">
        <div class="c px-4 tal" style="width: 400px;">

          <p>
            {{lg('',{
              en: 'Welcome to ThuggerDRAW -the NFT lucky draw where you can win big prizes in DRUGS!',
              zh: '欢迎来到ThuggerDraw-在NFT的幸运抽奖活动中您可以赢取Drugs的大奖！',
            })}}
          </p>

          <p>
            {{lg('',{
              en: 'Put together the words to win a prize. The first to spell Thugs.Fi wins BIG!',
              zh: '将单词拼在一起,就能获得奖励。第一个拼出Thugs.F的人将赢得大奖!',
            })}}
          </p>

          <p>
            {{lg('',{
              en: `Only 5 JGN per play and don't worry, we all win! All JGN used (minus the rewards) in the draw will be burned forever`,
              zh: '玩一次只需要5 JGN ...用于抽奖的JGN都会用于奖品来分发,剩余的部分将被永久被销毁!',
            })}}
            
          </p>

          <div class="card-btn-box_x pt-4">
            <button 
              v-if="!$store.state.web3.account" 
              @click="triggerLogin()"
              class="btn btn-primary gold"
              >
              CONNECT WALLET
            </button>

            <button  
              v-else-if="!$store.state.web3.status_account_approved_jgn"
              :class="['btn btn-primary gold']"
              style="min-width: 150px;" 
              @click="approveJgn()" 
              >
              Approve
            </button>
            
            <button 
              v-else 
              @click="drawBtn()"
              class="btn btn-primary gold"
              style="min-width: 150px;" 
              >
              Draw
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="my-4">
      <span class="c small">
        {{lg('',{
              en: 'You will need 5 JGN to open the Treasure Chest to get a RANDOM NFT',
              zh: '你需要5个JGN来打开宝箱,以获得随机的一张NFT卡牌。',
            })}}
      </span>
    </div>

    <drawFx :conf="draw_config"/>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import bus from '@/bus.js'
import drawFx from './draw_fx/'

import main_list_card from '@/data/main_list_card.js'

export default {
  name: 'draw',
  components: {
    drawFx,
  },
  props: [],
  data() {
    return {

      input_num: '',

      draw_config: {
        status: '',
        reward_pic: '',
      },
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
      'getDrawResult',
    ]),

    async checkApproveJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark = await v.hasApproveJGN(address_my)
      console.log('hasApproveJGN() res:',mark)
      v.$store.commit('setWeb3Data',{
        status_account_approved_jgn: mark
      })
    },
    approveJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){ 
        bus.topnavvue.modalOpen = true
        return 
      }

      v.approveJGN()
    },

    triggerLogin(){
      bus.topnavvue.modalOpen = true
    },

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
      let v = this
      let address_my = v.$store.state.web3.account

      await this.draw({
        num: 50,
        callHookOnDraw: function(){
          // fx start
          console.log('callHookOnDraw')
          v.draw_config.status = 'loading'
        },
      },address_my)


      
      let res = await v.getDrawResult(address_my)
      console.log('draw res:', res)

      // fx end
      const list_all = main_list_card
      v.draw_config.status = 'done'
      v.draw_config.reward_pic = list_all.find(item => item.card_id == res).item_post_pic
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