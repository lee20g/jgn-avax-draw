<template>

  <div>
    <div class="container-lg mx-auto">

      <!-- main logo -->
      <div class="block-main-theme-logo">
        <div class="pic-title">
          <img src="~@/assets/static/img/css_img/theme-title-02-my.png">
        </div>
      </div>

      <div class="ui-card-sp" style="min-height: 200px;">
        <div class="el-snow snow-left snow-b"></div>
        <div class="el-snow snow-right snow-b"></div>


        <div v-if="!$store.state.web3.account" class="tac">
          {{lg('',{
            en: 'Please Connect Wallet.',
            zh: '请链接钱包',
          })}}
        </div>

        <div v-else class="list-card pt-4">
          <div 
            v-for="(item,index) of my_list_card" 
            :key="index" 
            class="item-nft tac border"
            >
            <cardItem :data="item" @transferItem="showTransferPoppad(item)"/>
          </div>
        </div>
      </div>

      <div class="pt-3 mb-5 pb-4 tac">
        
        <button 
          v-if=" my_list_card && my_list_card.length && !status_approve_nft"
          class="btn btn-primary gold px-5"
          @click="approveNft()"
          >
          {{lg('',{
            en: 'Approve',
            zh: '',
          })}}
        </button>

        <button 
          v-if=" my_list_card && my_list_card.length && status_approve_nft"
          class="btn btn-primary gold px-5"
          @click="clickBtnClaim()"
          >
          {{lg('',{
            en: 'Claim Rewards',
            zh: '',
          })}}
        </button>
      </div>

      <UiModal :open="status_pad_transfer" @close="status_pad_transfer = false">
        <div v-if="item_on_transfer && item_on_transfer.card_id" class="px-5 pb-5">
          <h3 class="pt-4">Transfer</h3>
          <div class="tac pt-4" style="height: 200px;">
            <img :src="require(`../../assets/pic/card/${item_on_transfer.item_post_pic}`)" style="width: 100px;">
          </div>
          <div class="mb-3">
            <label>Amount</label>
            <input v-model="input_transfer_amount" type="number" step="1" min="1" :max="item_on_transfer.num_my" class="form-control" placeholder="Amount">
          </div>
          <div class="mb-3">
            <label>To Address</label>
            <input v-model="input_transfer_address" type="text" class="form-control" placeholder="To Address">
          </div>
          <div class="mt-5 tac">
            <button @click="submitTransfer()" class="btn btn-primary gold" style="min-width: 150px;">
              Transfer
            </button>
          </div>
        </div>
      </UiModal>
    </div>

    <!-- bottom bg -->
    <div class="ui-sp-snow-bg cover-obj_xx"></div>
  </div>
</template>

<script>
import bus from '@/bus.js'

import { mapActions } from 'vuex';
import main_list from '@/data/main_list_card.js'

import cardItem from './card_item.vue'

export default {
  name: 'cardMy',
  components: {
    cardItem,
  },
  props: [],
  data() {
    return {

      status_approve_nft: false,

      my_list_card: [
        // demo data：
        // {
        //   item_post_pic: 'AVAXKing.jpeg',
        //   num_my: 2,
        // },
        // {
        //   item_post_pic: 'Goggles.jpeg',
        //   num_my: 2,
        // },
        // {
        //   item_post_pic: 'letter_G.jpeg',
        //   num_my: 2,
        // },
      ],

      num_jgn_balance: '-',
      num_jgn_staked: '-',
      num_jxp_earned: '-',
      

      status_show_pad_harvest: false,
      status_show_pad_stake: false,
      
      status_ui_stake_or_unstake: '', // stake unstake

      input_num: '',

      // transfer
      status_pad_transfer: false,
      item_on_transfer: {},
      input_transfer_amount: 0,
      input_transfer_address: '',
    }
  },
  computed: {},
  watch: {

    // 检测登陆钱包切换，重新读数据
    '$store.state.web3.account'(val,old_val){
      if(val){
        this.run()
      }
    },
  },
  methods: {
    ...mapActions([
      'myCollections',
      'hasApproveNFT',
      'approveNFT',
      'redeem',
      'transferNFT',
    ]),

    async submitTransfer(){
      let v = this

      let form = {
        address: v.$store.state.web3.account,
        toAddress: v.input_transfer_address,
        num: '' + v.input_transfer_amount,
        nft_id: v.item_on_transfer.card_id,

        callback: function(){
          v.status_pad_transfer = false
          v.listData()
        },
      }

      if(!form.num || !form.toAddress){
        return
      }

      await v.transferNFT(form)
    },

    showTransferPoppad(item) {
      let v = this
      console.log('aoeu',item)

      v.item_on_transfer = item
      v.status_pad_transfer = true
      v.input_transfer_amount = item.num_my
      v.input_transfer_address = ''
    },

    async checkApproveNft(){
      let v = this
      let mark = await v.hasApproveNFT(v.$store.state.web3.account)
      console.log('checkApproveNft,',mark)
      v.status_approve_nft = mark
    },

    async approveNft(){
      let v = this
      await v.approveNFT()
      v.status_approve_nft = true
    },

    async listData(){
      let v = this
      
      let my_address = v.$store.state.web3.account
      if(!my_address){
        v.my_list_card = []
        return
      }

      console.log('======my list 12')
      let arr = await v.myCollections(my_address)

      console.log('======my list 22')
      console.log(arr)

      let temp = []
      let list_all = ([]).concat(main_list)

      for(let i in arr){
        let id = parseFloat(i) + 1
        let num = arr[i]

        if(num){
          let obj = list_all.find(item => item.card_id == id)
          console.log(obj)
          obj = JSON.parse(JSON.stringify(obj))
          obj.num_my = num
          temp.push(obj)
        }
      }
      
      v.my_list_card = temp
    },

    async clickBtnClaim(){
      let v = this
      v.redeem({
        address: v.$store.state.web3.account,
      })
    },

    run(){
      if(!this.$store.state.web3.account){
        return
      }
      this.listData()
      this.checkApproveNft()
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
      width: 14%;
      margin: 0px 1.2%;
      border-radius: 10px;
      color: #fff;
      

      .pic-box{
        border-radius: 15px;
        overflow: hidden;
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

    }

    @media(max-width: 788px){
      margin-left: 4%;
      .item-nft{
        width: 45%;
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

        &.on{
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