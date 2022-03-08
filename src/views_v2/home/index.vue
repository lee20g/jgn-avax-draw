<template>
  <div>

    <div class="container px-4 tac">

      <!-- main logo -->
      <div class="block-main-theme-logo">
        <div class="pic-title">
          <img src="~@/assets/static/img/css_img/theme-title-01-home.png">
        </div>
      </div>

      <div class="ui-card-sp">
        <div class="el-snow snow-left"></div>
        <div class="el-snow snow-right"></div>

        <div>
          <p>
            {{lg('',{
              en: 'Welcome to JugerDRAW - the NFT lucky draw where you can win big JGN prizes!',
              zh: '欢迎来到JuggerDraw - 在NFT的幸运抽奖活动中您可以赢取JGN的大奖!',
            })}}
          </p>
          <p>
            {{lg('',{
              en: 'Put together the words to win a prize. The first to spell Juggernaut wins BIG!',
              zh: '将单词拼在一起，就能获得奖励。第一个拼出 Juggernaut 的人将赢得大奖!',
            })}}
          </p>
          <p>
            {{lg('',{
              en: `Only 10 JGN per play... and don't worry, we all win! `,
              zh: '玩一次只需要10 JGN......所有用于抽奖的JGN都会用于奖品来分发，',
            })}}
            <br>
            {{lg('',{
              en: 'All JGN used in the draw will be burned forever!',
              zh: '所有用于抽奖的JGN都会永久销毁！',
            })}}
          </p>

          <div class="bg-white text-dark b mx-5 py-1">
            {{lg('',{
              en: 'You will need 10 JGN to open the Treasure Chest to get a RANDOM NFT',
              zh: '使用 10 JGN 打开宝箱，获得随机 NFT',
            })}}
          </div>
        </div>
      </div>

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
          style="min-width: 200px;" 
          @click="approveJgn()" 
          >
          Approve
        </button>
        
        <button 
          v-else 
          @click="drawBtn()"
          class="btn btn-primary gold"
          style="min-width: 200px;" 
          >
          Draw
        </button>
      </div>

      <div class="head-row c">
         <div class="el-snow snow-left"></div>
        <div class="el-snow snow-right"></div>
        <br>
        <p>
            {{lg('',{
              en: 'Please note, all the NFTs are SOLD OUT. Please wait and paricipate in the next one.',
              zh: '本轮卡牌已经全部被售罄，请不要再抽取。欢迎关注我们下一期的活动',
            })}}
        </p>
      </div>

      <drawFx :conf="draw_config"/>
    </div>
    
    <!-- bottom bg -->
    <div class="ui-sp-snow-bg cover-obj"></div>
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