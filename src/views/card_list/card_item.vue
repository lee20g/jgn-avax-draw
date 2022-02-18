<template>
<div class="comp-card">
  <div class="pic-box">
    <img :src="require(`../../assets/pic/card/${card_data.item_post_pic}`)">
  </div>
  <div class="left-box">
    <div class="mx-auto d-flex" style="width: 80%;">
      <span>
        {{card_data.num_minted | qfw}} 
        
        {{lg('',{
          en: 'MINTED',
          zh:'已生成',
        })}}
      </span>
      <span>
        {{card_data.num_left | qfw}} 
        
        {{lg('',{
          en: 'LEFT',
          zh:'剩余',
        })}}
      </span>
    </div>
  </div>
  <div class="pt-4">
    <h4>
      {{lg('',card_data.item_title)}}
    </h4>
  </div>
  <!-- <div class="el-mark-des">
    {{lg('',card_data.item_des)}}
  </div> -->
  <div class="mt-3">

    <!-- <div class="mb-3">
      <span class="btn text-white cd" style="border: 1px dashed rgba(255,255,255,0.4)">
        
        {{lg('',{
          en: 'You Need',
          zh:'您需',
        })}}

        {{card_data.cfg_num_jxp_needed | qfw}} jXP
      </span>
    </div> -->

    <!-- <div class="mb-3">
      {{lg('',{
        en: 'Your jXP Balance',
        zh:'您的 jXP 余额',
      })}}:
      {{$store.state.web3.account_balance_jxp | tofixed2 | qfw}}
    </div> -->

    <!-- <div v-if="!$store.state.web3.status_account_approved_jxp">
      <button @click="$parent.approveJxp()" class="btn btn-primary">
        {{lg('',{
          en: 'Acquire',
          zh:'获取',
        })}}
      </button>
    </div>
    <div v-else>
      <div>
        <button @click="$parent.redeemNft(card_data.card_id)" class="btn btn-primary">
          Redeem
        </button>
      </div>
    </div> -->

  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'cardItem',
  components: {},
  props: [
    'data'
  ],
  data() {
    return {
      card_data: {
        num_total: '-',
        num_minted: '-',
        num_left: '-',
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'redeemNFT',

      'ntfTotalSupply',
      'ntfMinted',
    ]),

    async queryItem(){
      let v = this
      let id = v.card_data.card_id || ''
      if(!id){return}
      
      v.card_data.num_total = await v.ntfTotalSupply(id)
      v.card_data.num_minted = await v.ntfMinted(id)
      v.card_data.num_left = v.card_data.num_total - v.card_data.num_minted
    },

    run(){
      let v = this
      let time = 4000
      let my_address = v.$store.state.web3.account
      if(my_address){
        time = 200
      }
      setTimeout(function(){
        v.queryItem()
      },time)
    },


  },
  created() {
    this.card_data = Object.assign(this.card_data,this.data)
    
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
  .comp-card{
    font-size: 14px;
  }
</style>