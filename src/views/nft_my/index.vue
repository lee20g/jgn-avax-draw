<template>
  <div class="container-lg mx-auto">

    <div class="d-flex align-items-center">
      <img src="/static/jgnlog.jpg" style="width: 80px;height: 100px;">
      <span class="b ml-3 pc-fs-3em mb-fs-2em">
        JUGGERSWAP
      </span>
    </div>

    <div class="py-4">
      <div class="c mb-2">
        NFT COLLECTION
      </div>
      <h2>
        My Cards
      </h2>
    </div>

    <div class="list-nft">

      
      <div 
        v-for="(item,index) of my_list_nft" 
        :key="index" 
        class="item-nft tac border mb-5 pb-4"
        >
        <cardItem :data="item"/>
      </div>
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
  name: 'nftMy',
  components: {
    cardItem,
  },
  props: [],
  data() {
    return {
      my_list_nft: [],

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
        this.listData()
      }
    },
  },
  methods: {
    ...mapActions([
      'myCollections',
    ]),

    async listData(){
      let v = this
      
      let my_address = v.$store.state.web3.account
      if(!my_address){
        v.my_list_nft = []
        return
      }

      console.log('======my list 13')
      let arr = await v.myCollections(my_address)
      console.log('======my list 23')
      console.log(arr)
      // arr = [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1]

      let temp = []
      let list_all = ([]).concat(main_list_nft).concat(main_list_nft2)

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
      
      v.my_list_nft = temp
    },
  },
  created() {
    this.listData()
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

    .item-nft{
      width: 28%;
      margin: 30px 2.5%;
      border-radius: 10px;
      background-color: mix(#fff,$c,25);
      color: #fff;
      

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