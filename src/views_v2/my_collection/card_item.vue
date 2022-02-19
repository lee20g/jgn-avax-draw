<template>
<div class="comp-card">
  <div class="pic-box">
    <img :src="require(`../../assets/pic/card/${card_data.item_post_pic}`)">
  </div>

  <div class="tac mt-2">
    <button @click="$emit('transferItem',data)" class="btn btn-primary gold" style="padding: 0px 0px;min-width: 80px;">
      Transfer
    </button>
  </div>

  <div class="pt-2">
    <div class="">
      <!-- {{lg('',card_data.item_title)}} -->
      <span class="c">
        {{lg('',{
          en: 'NUMBER OF CARDS',
          zh: '我拥有',
        })}}
      </span>
      <br>
      {{card_data.num_my}}
    </div>
  </div>

  <!-- <div class="mt-3">
    Own {{card_data.num_my | qfw}} Card
  </div> -->
  
  <div class="mt-3">
    <!-- des...(目前没写des这部分) -->
    <!-- <div>
      <a :href="`${sitecfg.url_opensea_view}assets/${$store.state.web3.NTFS_TOKEN_ADDRESS}/${card_data.card_id}`" target="_blank">
        <button class="btn btn-primary">
          <img src="/static/img/opensea-logo.png" style="width: 26px;margin-top: -3px;">
          Check Open Sea
        </button>
      </a>
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
    ]),
  },
  created() {
    this.card_data = Object.assign(this.card_data,this.data)
    
    // this.queryItem()
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