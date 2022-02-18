<template>
  <div class="card tac p-4">

    <h5 class="mb-3 b">
      {{lg('',{
        en: 'Prize',
        zh: '奖品',
      })}}
      {{item.id}}
    </h5>

    <div class="d-flex mb-2">
      <span>
        {{lg('',{
          en: 'Collection',
          zh: '收集',
        })}}:
      </span>
      <span class="ml-auto b">
        {{lg('',item.name)}}
      </span>
    </div>

    <div class="d-flex mb-2">
      <span>
        {{lg('',{
          en: 'Prize',
          zh: '奖品',
        })}}:
      </span>
      <span class="ml-auto">
        {{item.prize}}
      </span>
    </div>

    <div class="d-flex mb-2">
      <span>
        {{lg('',{
          en: 'Prize Left',
          zh: '奖品还剩',
        })}}:
      </span>
      <span class="ml-auto">

        {{ prize_left }}
      </span>
    </div>

    <div class="d-flex mb-2">
      <span>
        {{lg('',{
          en: 'Prize Total',
          zh: '奖品总量',
        })}}:
      </span>
      <span class="ml-auto">
        {{item.prize_total}}
      </span>
    </div>

    <div class="d-flex mb-2">
      <span>
        {{lg('',{
          en: '_can_redeem',
          zh: '',
        })}}:
      </span>
      <span class="ml-auto">
        {{item.status_can_redeem}}
      </span>
    </div>

    <div>
      <button v-if="!status_approve_nft" @click="approveNft()" class="btn btn-primary mt-3" style="min-width: 100px;">
        {{lg('',{
          en: 'Approve',
          zh: '',
        })}}
      </button>
      <button v-else @click="actionExchange(item)" class="btn btn-primary mt-3" style="min-width: 100px;">
        {{lg('',{
          en: 'Exchange',
          zh: '兑换',
        })}}
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'prizeItem',
  components: {},
  props: [
    'item',
    'status_approve_nft',
  ],
  data() {
    return {
      
    }
  },
  computed: {
    prize_left(){
      let v = this
      let mark = '-'
      if(v.item.prize_total != '-' && v.item.prize_done != '-'){
        mark = v.item.prize_total - v.item.prize_done
        v.item.prize_left = mark
      }
      return mark 
    },
  },
  watch: {},
  methods: {
    ...mapActions([
      'maxRewardNum',
      'currentRewardNum',
      'canRedeem',
      'redeem',
    ]),
    async actionExchange(item){
      let v = this
      v.redeem(v.item.id)
    },

    async getRewardTotal(){
      let v = this
      let num = await v.maxRewardNum(v.item.id)
      v.item.prize_total = num
    },
    async getRewardDone(){
      let v = this
      let num = await v.currentRewardNum(v.item.id)
      v.item.prize_done = num
    },

    async checkCanRedeem(){
      let v = this
      let mark = await v.canRedeem({
        address: v.$store.state.web3.account,
        index: v.item.id,
      })
      v.item.status_can_redeem = mark
    },

    async approveNft(){
      let v = this
      v.$parent.approveNft()
    },

    run(){
      let v = this
      v.getRewardTotal()
      v.getRewardDone()

      if(!v.$store.state.web3.account){
        return
      }
      v.checkCanRedeem()
    },
  },
  created() {
    let v = this
    if(window.store_web3){
      v.run()
    }else{
      setTimeout(function(){
        v.run()
      },4000)
    }
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