<template>
  <table class="table mx-auto mb-5" style="max-width: 750px;">
    <tr class="head-row c text-uppercase">
      <td>
        {{lg('',{
          en: 'Collections',
          zh: '卡牌合集',
        })}}
      </td>
      <td>
        {{lg('',{
          en: 'Rewards',
          zh: '奖励',
        })}}
      </td>
      <td>
        {{lg('',{
          en: 'Number of NFTs',
          zh: '卡片数目',
        })}}
      </td>
      <td class="tar">
        {{lg('',{
          en: 'Chances',
          zh: '概率',
        })}}
      </td>
    </tr>

    <tr v-for="(item,index) of list_reward" :key="index">
      <td>
        {{lg('',item.name)}}
      </td>
      <td>
        {{lg('',item.reward)}}
      </td>
      <td>
        {{lg('',item.number)}}
      </td>
      <td class="tar">
        {{lg('',item.chance)}}
      </td>
    </tr>

    <tr class="">
      <td>
        <div style="max-width: 250px; font-size: 13px;">
          {{lg('',{
            en: 'JGN-AVAX GENESIS COLLECTION – Winter Wonderland',
            zh: '',
          })}}
        </div>
      </td>
      <td colspan="2">
        {{lg('',{
          en: 'The NFT card can be traded*',
          zh: '',
        })}}
      </td>
      <td class="tar">
        {{lg('',{
          en: '700 in total',
          zh: '',
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
          name: {
            en: 'JUGGERNAUT',
            zh: '',
          },
          reward: {
            en: '8,000 JGN',
            zh: '',
          },
          number: {
            en: '10',
            zh: '需要对应的 10 张卡牌',
          },
          chance: {
            en: '1 in total',
            zh: '',
          },
        },
        {
          name: {
            en: 'JGN',
            zh: '',
          },
          reward: {
            en: '1,500 JGN',
            zh: '',
          },
          number: {
            en: '3',
            zh: '需要对应的 3 张卡牌',
          },
          chance: {
            en: '10 in total',
            zh: '',
          },
        },
        {
          name: {
            en: 'JUGGER',
            zh: '',
          },
          reward: {
            en: '300 JGN',
            zh: '',
          },
          number: {
            en: '6',
            zh: '需要对应的 6 张卡牌',
          },
          chance: {
            en: '100 in total',
            zh: '',
          },
        },
        {
          name: {
            en: 'Instant Win - 50 JGN',
            zh: '',
          },
          reward: {
            en: '50 JGN',
            zh: '',
          },
          number: {
            en: '1',
            zh: '需要对应的 1 张卡牌',
          },
          chance: {
            en: '187 in total',
            zh: '',
          },
        },
        {
          name: {
            en: 'Instant Win - 30 JGN',
            zh: '',
          },
          reward: {
            en: '30 JGN',
            zh: '',
          },
          number: {
            en: '1',
            zh: '需要对应的 1 张卡牌',
          },
          chance: {
            en: '500 in total',
            zh: '',
          },
        },
        {
          name: {
            en: 'Instant Win - 10 JGN',
            zh: '',
          },
          reward: {
            en: '10 JGN',
            zh: '',
          },
          number: {
            en: '1',
            zh: '需要对应的 1 张卡牌',
          },
          chance: {
            en: '800 in total',
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