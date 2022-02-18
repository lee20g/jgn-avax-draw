<template>
  <div class="container-lg mx-auto">

    <!-- <div class="tac py-5">
      <img src="/static/jgnlog.jpg" style="width: 80px;height: 100px;">
    </div> -->
    

    <div :class="['list-card']">

      
      <div 
        v-for="(item,index) of main_list" 
        :key="index" 
        :class="['item-nft tac border mb-5 pb-4']"
        >
        <cardItem :data="item"/>
      </div>
    </div>


    
  </div>
</template>

<script>
import bus from '@/bus.js'

import { mapActions } from 'vuex';
import main_list from '@/data/main_list_card.js'
import cardItem from './card_item.vue'

export default {
  name: 'cardList',
  components: {
    cardItem,
  },
  props: [],
  data() {

    // 根据路由选择页面数据

    return {
      main_list: main_list,

      num_jgn_balance: '-',
      num_jgn_staked: '-',
      num_jxp_earned: '-',
      

      status_show_pad_harvest: false,
      status_show_pad_stake: false,
      
      status_ui_stake_or_unstake: '', // stake unstake

      input_num: '',
    }
  },
  computed: {},
  watch: {
    // 切换ui置空input
    'status_ui_stake_or_unstake'(){
      // this.input_num = ''
      this.setInputNumMax()
    },

    // 检测登陆钱包切换，重新读数据
    '$store.state.web3.account'(val,old_val){
      if(val){
        this.run()
      }
    },
  },
  methods: {
    ...mapActions([
      'hasApproveJGN',
      'hasApproveJXP',
      'getHasStakeJGN',
      'getPendingJXP',

      'getJGNBalance',
      'getJXPBalance',

      'approveJGN',
      'stakeJGN',
      'stakeJGNWithRef',
      'unStakeJGN',

      'harvestJXP',

      'approveJXP',
      'redeemNFT',
    ]),

    // ui
    setInputNumMax(){
      let v = this
      if(v.status_ui_stake_or_unstake === 'stake'){
        let num = v.num_jgn_balance
        if(num === '-'){ num = 0}
        v.input_num = num
      }
      else{
        let num = v.num_jgn_staked
        if(num === '-'){ num = 0}
        v.input_num = num
      }
    },

    // ui 
    setActionStatus(str){
      let old_val = this.status_ui_stake_or_unstake
      let mark = ''
      
      if(str == old_val){
        mark = ''
      }else{
        mark = str
      }
      this.status_ui_stake_or_unstake = mark
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
    async getBalanceJxp(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark =  await v.getJXPBalance(address_my)
      v.$store.commit('setWeb3Data',{
        account_balance_jxp: mark,
      })
    },
    
    async redeemNft(id){
      let v = this
      if(!id){
        console.log('fn-redeemNft need id')
        return
      }
      v.redeemNFT(id)
    },

    approveJxp(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){ 
        bus.topnavvue.modalOpen = true
        return 
      }

      v.approveJXP()
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
    stakeJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      let ref_address = v.$store.state.web3.referral_address
      if(!address_my){ return }

      let num = v.input_num
      if(!num){ return } 

      if(ref_address){
        v.stakeJGNWithRef({
          num: num,
          ref: ref_address
        })
      }else{
        v.stakeJGN({
          num: num,
        })
      }
    },
    unstakeJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){ return }

      let num = v.input_num
      if(!num){ return } 
      v.unStakeJGN({
        num: num
      })
    },

    harvestJxp(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){ 
        bus.topnavvue.modalOpen = true
        return 
      }

      v.harvestJXP({})
    },

    async queryNumJgnStaked(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark =  await v.getHasStakeJGN(address_my)
      v.num_jgn_staked = mark
    },
    async queryNumJxpEarned(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark =  await v.getPendingJXP(address_my)
      v.num_jxp_earned = mark
    },

    async checkApproveJgn(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark = await v.hasApproveJGN(address_my)
      v.$store.commit('setWeb3Data',{
        status_account_approved_jgn: mark
      })
    },

    async checkApproveJxp(){
      let v = this
      let address_my = v.$store.state.web3.account
      let mark = await v.hasApproveJXP(address_my)
      v.$store.commit('setWeb3Data',{
        status_account_approved_jxp: mark
      })
    },

    run(){
      let v = this
      let address_my = v.$store.state.web3.account
      if(!address_my){
        return
      }
      v.getBalanceJgn()
      v.getBalanceJxp()
      v.queryNumJgnStaked()
      v.queryNumJxpEarned()
      v.checkApproveJgn()
      v.checkApproveJxp()
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
  @import '~@/assets/css/vars.scss';

  /deep/ .list-card{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;

    @media(min-width: 789px){

      &.set-row-item-2{
        .item-nft{
          width: 30%;
          margin: 30px 10%;
        }
      }
    }

    .item-nft{
      width: 28%;
      margin: 30px 2.5%;
      border-radius: 10px;
      background-color: #333;
      color: #fff;
      

      .pic-box{
        border-radius: 15px;
        overflow: hidden;
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);

        img{
          width: 100%;
          object-fit: cover;
        }
      }
      
      // 剩余box
      .left-box{
        position: relative;
        z-index: 1;
        &>div{
          text-align: center;
          background-color: $c;
          color: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
          span{
            flex: 1;

            &:first-child{
              background-color: #fff;
              color: $c;
            }
          }
        }
        
      }

      .btn-primary{
        $c_btn: #56B453;
        background-color: $c_btn !important;
        border-color: darken($c_btn, 8) !important;
      }
    }

    @media(max-width: 788px){
      .item-nft{
        width: 98%;
      }
    }
  }

  .menu-box{

    .menu-row{
      position: relative;
      z-index: 9;
      background-color: mix($c,#fff,80);
      color: #fff;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-radius: 5px;
      // border: 1px solid rgba(0,0,0,0.1);
      span,.btn{
        min-width: 200px;
        border-radius: 0;
        border-left: 1px solid rgba(0,0,0,0.1) !important;
        border-bottom: 1px solid rgba(0,0,0,0.1) !important;

        &.on{
          // background-color: #fff !important;
          // color: #333 !important;
          background-color: transparent !important;
        }
      }
      span{
        padding-left: 15px;
        text-align: center;
      }
    }
    .menu-toggle-pad{
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      background-color: #fff;
      position: absolute;
      z-index: 8;
      top: 100%;
      right: 5px;
      left: 5px;
      max-width: 100%;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      animation: slideDown .3s 1;

      .fas{
        min-width: 20px;
      }
    }

    @keyframes slideDown{
      0%{
        opacity: 0;
        margin-top: -50px;
      }
      100%{
        opacity: 1;
        margin-top: 0;
      }
    }
  }
</style>