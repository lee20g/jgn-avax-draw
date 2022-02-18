<template>
  <div class="container-lg mx-auto">

    <div class="d-flex align-items-center">
      <img src="/static/jgnlog.jpg" style="width: 80px;height: 100px;">
      <span class="b ml-3 pc-fs-3em mb-fs-2em">
        NFT Marketplace
      </span>
    </div>
    
    <div class="mt-4 d-flex ">
      <div class="pc-ml-auto">

        <div :class="['menu-box ref',page_theme]">
          <div class="menu-row">
            <!-- <span class="d-inline-block mb-w-100 mr-3"></span> -->

            <button 
              :class="[
                'btn btn-primary mb-w-100 cd',
                {pink: page_theme === 'sp-nft2'}
              ]"
              >
              {{num_jgn_staked | tofixed3 | qfw}} 
              JGN 
              {{lg('',{
                en: 'Staked',
                zh: '已质押',
              })}}
            </button>

            <button 
              @click="status_show_pad_stake = false;status_show_pad_harvest = !status_show_pad_harvest; " 
              :class="[
                'btn btn-primary mb-w-100',
                {'on':status_show_pad_harvest},
                {pink: page_theme === 'sp-nft2'},
              ]"
              >
              {{num_jxp_earned | tofixed3 | qfw}} 
              jXP 
              {{lg('',{
                en: 'Earned',
                zh: '已获取',
              })}}
              <i class="fas fa-angle-down"></i>
            </button>

            <button 
              @click="status_show_pad_harvest = false;status_show_pad_stake = !status_show_pad_stake; " 
              :class="[
                'btn btn-primary mb-w-100',
                {'on':status_show_pad_stake},
                {pink: page_theme === 'sp-nft2'},
              ]"
              >
              <i class="fas fa-tools text-dark mr-2"></i>
              {{lg('',{
                en: 'Manage Stake',
                zh: '管理质押',
              })}}
              <i class="fas fa-angle-down"></i>
            </button>
          </div>

          <!-- pad -->
          <div key="pad-harvest" v-if="status_show_pad_harvest" class="menu-toggle-pad">
            <div class="border p-4">
              <h3>
                Harvest jXP
                
              </h3>
              <div class="pb-3">
                <button 
                  @click="harvestJxp()" 
                  :class="['btn btn-primary mr-3',{pink: page_theme === 'sp-nft2'}]"
                  >
                  Harvest
                </button>
              </div>
            </div>
          </div>
          <!-- pad -->
          <div key="pad-stake" v-if="status_show_pad_stake" class="menu-toggle-pad">
            <div class="border p-4">
              <h3>
                Deposit JGN, Earn jXP, Mint NFTs.
              </h3>
              <p>
                Staking 10,000 JGN tokens in the Genesis pool earns you roughly 1,000 jXP per day. With enough jXP, you can mint an exclusive limited-edition NFT. Total 10,000,000 jXP is available for this pool.
              </p>
              <div v-if="!$store.state.web3.status_account_approved_jgn" class="pb-3">
                <button 
                  @click="approveJgn()" 
                  :class="['btn btn-primary mr-3',{pink: page_theme === 'sp-nft2'}]"
                  >
                  Approve
                </button>
              </div>
              <div v-if="$store.state.web3.status_account_approved_jgn" class="pb-3">
                <button 
                  @click="setActionStatus('stake')"
                  :class="['btn btn-outline-primary mr-3',{pink: page_theme === 'sp-nft2'}]"
                  >
                  Stake
                  <i v-if="status_ui_stake_or_unstake === 'stake'" class="fas fa-angle-down"></i>
                  <i v-else class="fas fa-angle-right"></i>
                </button>
                <button 
                  @click="setActionStatus('unstake')"
                  :class="['btn btn-outline-primary mr-3',{pink: page_theme === 'sp-nft2'}]"
                  >
                  Unstake
                  <i v-if="status_ui_stake_or_unstake === 'unstake'" class="fas fa-angle-down"></i>
                  <i v-else class="fas fa-angle-right"></i>
                </button>
              </div>

              <!-- input  -->
              <div v-if="status_ui_stake_or_unstake" class="d-flex pb-3">
                <div class="input-group">
                  <input type="text" v-model="input_num" class="form-control" style="border-right: none;" placeholder="0">
                  <div class="input-group-append" style="border-left: none;">
                    <span @click="setInputNumMax()" class="input-group-text cp">
                      Max
                    </span>
                  </div>
                </div>
                <button class="btn btn-primary ml-3">
                  <span 
                    @click="stakeJgn()" 
                    v-if="status_ui_stake_or_unstake === 'stake'"
                  >Stake</span>
                  <span 
                    @click="unstakeJgn()" 
                    v-if="status_ui_stake_or_unstake === 'unstake'"
                  >Unstake</span>
                </button>
              </div>
              <p>
                You are currently staking
                <b>{{num_jgn_staked | tofixed3 | qfw}} JGN</b>
                 – the maximum is 100,000 JGN
              </p>
              <hr>
              <div class="small">
                <a :href="`${sitecfg.url_network_address_view}${$store.state.web3.POOL1_TOKEN_ADDRESS}`" target="_blank">
                  <img src="~@/assets/img/icon_etherscan.svg" style="width: 20px;margin-top: -4px;" class="mr-2">

                  <u>View Contract on Etherscan</u>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>
    
    <!-- 新版文案 -->
    <div v-if="page_theme === 'sp-nft2'" class="py-4">
      <div class="c pink mb-2">
        
        {{lg('',{
          en: 'NFT COLLECTION',
          zh: 'NFT合集',
        })}}
      </div>
      <h2 class="mb-fs-15em" v-html="lg('',{
        en: 'Exclusive JGN NFT Collection: The Beauty in Decay',
        zh: '',
      })">
        
      </h2>
    </div>

    <!-- 老版文案 -->
    <div v-if="page_theme === ''" class="py-4">
      <div class="c mb-2">
        
        {{lg('',{
          en: 'NFT COLLECTION',
          zh: 'NFT合集',
        })}}
      </div>
      <h2 class="mb-fs-15em" v-html="lg('',{
        en: 'JGN 1<sup>st</sup> Edition: Genesis Cards Collection',
        zh: 'JGN 一代：创世卡牌合集',
      })">
        
      </h2>
    </div>

    <div :class="['list-nft',{'set-row-item-2': page_theme === 'sp-nft2'}]">

      
      <div 
        v-for="(item,index) of main_list_nft" 
        :key="index" 
        :class="['item-nft tac border mb-5 pb-4', page_theme]"
        >
        <cardItem :data="item"/>
      </div>
    </div>


    <div v-if="page_theme === 'sp-nft2'" class="tac py-5 mt-5">
      <a 
        href="https://juggernautdefi.medium.com/the-beauty-in-decay-exclusive-jgn-nft-collection-announcement-be32e7f226ad" 
        target="_blank"
        class="btn btn-primary round pink mx-4"
        >
        BLOG LINK
      </a>
      <a 
        href="https://vimeo.com/478771015#at=1" 
        target="_blank"
        class="btn btn-primary round black mx-4"
        >
        VIDEO LINK
      </a>
    </div>
  </div>
</template>

<script>
import bus from '@/bus.js'

import { mapActions } from 'vuex';
import main_list_nft from '@/data/main_list_nft.js'
import main_list_nft2 from '@/data/main_list_nft2.js'
import cardItem from './card_item.vue'

export default {
  name: 'nft',
  components: {
    cardItem,
  },
  props: [],
  data() {

    // 根据路由选择页面数据
    let page_theme = ''
    let list_on_show = null
    if(this.$route.path.indexOf('nft2') >=0){
      page_theme = 'sp-nft2'
      list_on_show = main_list_nft2
    }else{
      list_on_show = main_list_nft
    }

    return {
      page_theme: page_theme,
      main_list_nft: list_on_show,

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

  /deep/ .list-nft{
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
      background-color: mix(#fff,$c,20);
      color: #fff;

      &.sp-nft2{
        // background-color: mix(#fff,$c_pink,20);
        background-color: #333;

        .btn-primary{
          $c_btn: $c_pink;
          background-color: $c_btn !important;
          border-color: darken($c_btn, 8) !important;
        }
        
        .left-box{
          &>div{
            background-color: $c_pink !important;
          }
        }

        .el-mark-des{
          display: none;
        }
      }
      

      .pic-box{
        border-radius: 10px;
        overflow: hidden;
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);

        img{
          background-color: #222;;
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

    &.sp-nft2{
      .menu-row{
        background-color: mix($c_pink,#fff,80) !important;
      }
    }

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