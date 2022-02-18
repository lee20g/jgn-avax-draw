<template>
  <div class="container px-4 tac">

    <h1 class="py-5">
      {{lg('',{
        en: 'Prize',
        zh: '奖品置换',
      })}}
    </h1>

    <div class="row">

      <div 
        v-for="item of gift_list" :key="item.id" 
        class="col-md-3 mb-4"
        >
        <prizeItem 
          :item="item"
          :status_approve_nft="status_approve_nft"
        />
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import prizeItem from './prize_item.vue'

export default {
  name: 'exchange',
  components: {
    prizeItem,
  },
  props: [],
  data() {
    return {
      // prize_total 是总奖励份数, prize_done 是已经开奖了的份数

      status_approve_nft: false,

      gift_list: [
        {
          id: 1,
          name: {
            en: 'JUGGERNAUT',
            zh: '',
          },
          status_can_redeem: '',
          prize: '1 BTC',
          prize_total: '-',
          prize_done: '-',
        },
        {
          id: 2,
          name: {
            en: 'JGN',
            zh: '',
          },
          status_can_redeem: '',
          prize: '1 ETH',
          prize_total: '-',
          prize_done: '-',
        },
        {
          id: 3,
          name: {
            en: 'Jugger',
            zh: '',
          },
          status_can_redeem: '',
          prize: '1,000 JGN',
          prize_total: '-',
          prize_done: '-',
        },
        {
          id: 4,
          name: {
            en: 'Instant Card',
            zh: 'Instant 卡牌',
          },
          status_can_redeem: '',
          prize: '100 JGN',
          prize_total: '-',
          prize_done: '-',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      'hasApproveNFT',
      'approveNFT',
    ]),

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

    run(){
      let v = this

      if(!v.$store.state.web3.account){
        return 
      }
      v.checkApproveNft()
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