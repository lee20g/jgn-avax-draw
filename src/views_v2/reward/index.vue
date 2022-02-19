<template>

  <div>

    <div class="container mx-auto">
      
      <!-- main logo -->
      <div class="block-main-theme-logo">
        <div class="pic-title">
          <img src="~@/assets/static/img/css_img/theme-title-03-reward.png">
        </div>
      </div>

      <div class="ui-card-sp pb-5">
        <div class="el-snow snow-left"></div>
        <div class="el-snow snow-right"></div>

        <tableReward/>
        
      </div>
    </div>

    <!-- bottom bg -->
    <div class="ui-sp-snow-bg cover-obj_xx"></div>
  </div>
</template>

<script>
import tableReward from './table_reward.vue'

export default {
  name: 'rewards',
  components: {
    tableReward,
  },
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