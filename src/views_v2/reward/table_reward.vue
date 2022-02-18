<template>
  <table class="table mx-auto mb-5" style="max-width: 750px;">
    <tr class="head-row c">
      <td>
        {{lg('',{
          en: 'Reward Title',
          zh: '奖品名称',
        })}}
      </td>
      <td>
        {{lg('',{
          en: 'Rewards',
          zh: '奖品',
        })}}
      </td>
      <td>
        {{lg('',{
          en: 'Collections',
          zh: '组合名称',
        })}}
      </td>
      <td class="tar">
        {{lg('',{
          en: 'Chances',
          zh: '一共多少个奖品',
        })}}
      </td>
    </tr>

    <tr v-for="(item,index) of list_reward" :key="index">
      <td>
        {{lg('',item.des_name)}}
      </td>
      <td>
        {{lg('',item.reward)}}
      </td>
      <td>
        {{lg('',item.name)}}
      </td>
      <td class="tar">
        {{lg('',item.chance)}}
      </td>
    </tr>

    <tr class="c">
      <td>
        {{lg('',{
          en: 'NFT Cards (limited edition)',
          zh: '限量版NFT卡牌',
        })}}
      </td>
      <td colspan="3">
        {{lg('',{
          en: 'There are 6 kinds of cards, each has 50 in total. THE NFT CARD CAN BE TRADED on jgnnft.com',
          zh: '一共6种卡牌，每种卡牌50张。卡牌可以收集或者在JGNNFT.com交易',
        })}}
      </td>
    </tr>
    
  </table>
</template>

<script>

export default {
  name: '',
  components: {},
  props: [],
  data() {
    return {
      list_reward: [
        {
          des_name: {
            en: 'First Prize',
            zh: '一等奖',
          },
          reward: {
            en: '15,000 Drugs',
            zh: '15,000个Drugs',
          },
          name: {
            en: 'Thugs.Fi',
            zh: '',
          },
          chance: {
            en: '1 in total',
            zh: '',
          },
        },
        {
          des_name: {
            en: 'Second Prize',
            zh: '二等奖',
          },
          reward: {
            en: '1,500 Drugs',
            zh: '1,500个Drugs',
          },
          name: {
            en: 'Thugs',
            zh: '',
          },
          chance: {
            en: '10 in total',
            zh: '',
          },
        },
        {
          des_name: {
            en: 'Third Prize',
            zh: '三等奖',
          },
          reward: {
            en: '600 Drugs',
            zh: '600个Drugs',
          },
          name: {
            en: 'Fi',
            zh: '',
          },
          chance: {
            en: '30 in total',
            zh: '',
          },
        },
        {
          des_name: {
            en: 'Instant Win ',
            zh: '马上兑换奖',
          },
          reward: {
            en: '100 Drugs',
            zh: '100个Drugs',
          },
          name: {
            en: 'Instant Win – 100 Drugs',
            zh: '',
          },
          chance: {
            en: '50 in total',
            zh: '',
          },
        },
        {
          des_name: {
            en: 'Instant Win',
            zh: '马上兑换奖',
          },
          reward: {
            en: '30 Drugs',
            zh: '30个Drugs',
          },
          name: {
            en: 'Instant Win – 30 Drugs',
            zh: '',
          },
          chance: {
            en: '100 in total',
            zh: '',
          },
        },
        {
          des_name: {
            en: 'Instant Win',
            zh: '马上兑换奖',
          },
          reward: {
            en: '10 Drugs',
            zh: '10个Drugs',
          },
          name: {
            en: 'Instant Win – 10 Drugs',
            zh: '',
          },
          chance: {
            en: '152 in total',
            zh: '',
          },
        },
      ],
    }
  },
  computed: {},
  watch: {},
  methods: {
    
  },
  created() {
    
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