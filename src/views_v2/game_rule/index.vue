<template>

  <div>

    <div class="container mx-auto">
      <div class="pt-5">

        <div class="small">
          <h4 class="c mb-5 tac">
            {{lg('',{
              en: 'Game Rules',
              zh: '第一部分：卡牌总数、设置及费用',
            })}}:
          </h4>
          <p>
            {{lg('',{
              en: '1. Total Number of NFT cards = 3,000.',
              zh: '1、本系列NFT的总数目为3000张。',
            })}}
          </p>
          <p>
            {{lg('',{
              en: '2. There are 17 different kind of NFTs, including 8 letter cards, 3 “instant win” cards and 6 NFT cards in limited edition.',
              zh: '2、本系列一共有17种不同的卡牌 – 包括8种字母卡牌（Thugs.fi, 注意，“.”也是一张独立的卡牌），3种“instant win”卡牌 (“立即获奖”卡) 和 6种限量版的NFT卡牌。',
            })}}
          </p>
          <p>
            {{lg('',{
              en: '3. In our smart contract, the order of the NFTs are randomly ranked. i.e., what you can get is designed by our smart contract and can NOT be manipulated/predicted by anyone.',
              zh: '3、所有卡牌的顺序为任意规则排列，在智能合约里面提前设置好的，没有任何人可以修改或者调制。',
            })}}
          </p>
          <p>
            {{lg('',{
              en: '4. When you connect with your wallet, and pay 5 JGN (BEP-20) per DRAW, you will get one NFT cards. You can DRAW multiple times. As this game is on BSC, the gas fee is significantly lower than ether network.',
              zh: '4、每次链接钱包以后，需要支付5 JGN (BEP-20) 代币，就可以得到任意一张NFT卡牌。',
            })}}
            
          </p>
          <p>
            {{lg('',{
              en: '5. The probabilities of getting each of the NFT cards are the following:',
              zh: '5、字母卡牌解释：本系列普通字母卡牌为LETTER T,H,U,G,I；稀有的字母卡牌为LETTER S, LETTER F 和 Dot(.)。得到的概率如下表展示：',
            })}}
          </p>
          <p>
            {{lg('',{
              en: '6. "instant win card" card: When you get 1 “instant card” NFT cards, you can get either 100 Drugs, or 30 Drugs, or 10 Drugs, depends on which card that you get.',
              zh: '6、立即获奖卡牌：只需要一张卡牌，就可以领到对应的奖品，分别有10个Drugs, 30个Drugs 和100个Drugs三种不同的卡牌。',
            })}}
          </p>
          <p>
            {{lg('',{
              en: '7. There are 6 types of NFT cards in limited edition, with 50 available for each NFT cards. These cards can be saved in your wallet and will be available for trading in our coming JGN NFT exchange.',
              zh: '7、限量版NFT卡牌：一共6种类型，每种类别限量50张。可以收集或者未来在JGN交易市场进行交易。',
            })}}
          </p>
        </div>
        
        <table 
          class="sp-rate-table style-row-gap small w-100 mx-auto my-5"
          style="max-width: 400px;"
          >
          <tr class="head-row" style="font-size: 12px;">
            <td>
              {{lg('',{
                en: 'NFT NAME',
                zh: '卡牌名字',
              })}}
            </td>
              
            <td>
              {{lg('',{
                en: 'Total Cards',
                zh: '数目',
              })}}
            </td>
              
            <td>
              {{lg('',{
                en: 'Probability',
                zh: '概率',
              })}}
            </td>
              
          </tr>
          <tr 
            v-for="(item,index) of list_card_rate"
            :key="index"
            >
            <td>{{item.name}}</td>
            <td>{{item.num | qfw}}</td>
            <td>{{item.rate | bfh}}</td>
          </tr>
          <tr class="foot-row c">
            <td>
              {{lg('',{
                en: 'Total',
                zh: '总计',
              })}}
            </td>
            <td>3,000</td>
            <td>100.00%</td>
          </tr>
        </table>

        <div style="border-top: 2px dotted #333;"></div>

        <div class="py-5">

          <h4 class="c mb-4 tac">
            {{lg('',{
              en: 'Part II: Rewards',
              zh: '第二部分：奖品',
            })}}:
          </h4>


          <div class="mt-4 small pb-5">
            <h5 class="c mb-4">
              {{lg('',{
                en: 'There are FIVE TYPE of rewards:',
                zh: '奖品一共是五个类别：',
              })}}
              
            </h5>
            <p>
              {{lg('',{
                en: '1) When you collected “Thugs.Fi”, you can get 15,000 Drugs. Note, you need 8 respective NFT cards.',
                zh: '1) 当您集够了“Thugs.Fi”的全拼写，就可以换购15,000个Drugs。注意，一共需要8张NFT卡牌。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '2) When you collected “Thugs”, you can get 1,500 Drugs. Note, you need 5 respective NFT cards.',
                zh: '2) 当您集够了“Thugs “的全拼写，就可以换购1,500个Drugs。注意，一共需要5张NFT卡牌。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '3) When you collected “Fi”, you can get 600 Drugs. Note, you need 2 respective NFT cards. ',
                zh: '3) 当您集够了“Fi”的全拼写，就可以换购600个Drugs。注意，一共需要2张NFT卡牌。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '4) When you get 1 “instant card” NFT cards, you can get either 100 Drugs, or 30 Drugs, or 10 Drugs, depends on which instant card that you get. ',
                zh: '4) 当您得到“Instant Win”的卡牌，就可以换购100个Drugs或者 30个Drugs 或者 10 个Drugs，你的卡牌上面会写是哪一种。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '5) When you get the NFT cards in limited edition, save them in your wallet and you can trade in our NFT exchange coming soon.',
                zh: '5) 限量版NFT卡牌：一共6种类别，每种类别限量50张。可以收集或者未来在JGN交易市场进行交易。',
              })}}
            </p>
          </div>

          <tableReward class="sp-rate-table style-row-gap small"/>

        </div>

        <div class="tac">
          {{lg('',{
            en: 'JGN Foundation has all the final right of explanation of the game rules',
            zh: 'JGN官方拥有最后解释权',
          })}}
        </div>
      </div>
    </div>

    <!-- bottom bg -->
    <div class="ui-sp-snow-bg cover-obj_xx"></div>
  </div>
</template>

<script>
import tableReward from '../reward/table_reward.vue'

export default {
  name: 'gameRules',
  components: {
    tableReward,
  },
  props: [],
  data() {
    return {
      list_card_rate: [

        {
          name: 'Dot (.)',
          num: '1',
          rate: '0.03%',
        },
        {
          name: 'S',
          num: '11',
          rate: '0.37%',
        },
        {
          name: 'F ',
          num: '31',
          rate: '1.03%',
        },
        {
          name: 'T',
          num: '471',
          rate: '15.70%',
        },
        {
          name: 'H',
          num: '471',
          rate: '15.70%',
        },
        {
          name: 'U',
          num: '471',
          rate: '15.70%',
        },
        {
          name: 'G',
          num: '471',
          rate: '15.70%',
        },
        {
          name: 'I',
          num: '471',
          rate: '15.70%',
        },
        {
          name: 'Instant Win - 100 Drugs',
          num: '50',
          rate: '1.67%',
        },
        {
          name: 'Instant Win - 30 Drugs',
          num: '100',
          rate: '3.33%',
        },
        {
          name: 'Instant Win - 10 Drugs',
          num: '152',
          rate: '5.07%',
        },
        {
          name: 'NFT cards （6 KINDS）',
          num: '300',
          rate: '10.00%',
        },
      ],

      list_reward: [
        {
          type: {
            en: '',
            zh: '一等奖',
          },
          name: 'JUGGERNAUT',
          num_need_card: 10,
          reward: '8,000 JGN',
          num_reward_total: 1,
        },
        {
          type: {
            en: '',
            zh: '二等奖',
          },
          name: 'JGN',
          num_need_card: 3,
          reward: '1,500 JGN',
          num_reward_total: 10,
        },
        {
          type: {
            en: '',
            zh: '三等奖',
          },
          name: 'JUGGER',
          num_need_card: 6,
          reward: '300 JGN',
          num_reward_total: 100,
        },

        {
          type: {
            en: '',
            zh: '马上兑换奖',
          },
          name: 'INSTANT WIN - 50 JGN',
          num_need_card: 1,
          reward: '50 JGN',
          num_reward_total: 187,
        },
        {
          type: {
            en: '',
            zh: '马上兑换奖',
          },
          name: 'INSTANT WIN - 30 JGN',
          num_need_card: 1,
          reward: '30 JGN',
          num_reward_total: 500,
        },
        {
          type: {
            en: '',
            zh: '马上兑换奖',
          },
          name: 'INSTANT WIN - 10 JGN',
          num_need_card: 1,
          reward: '10 JGN',
          num_reward_total: 800,
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
  /deep/ .sp-rate-table{
    $bg_table: #222220;
    background-color: $bg_table;
    border-radius: 5px;
    overflow: hidden;

    &.style-row-gap{
      tr{
        &:nth-child(odd){
          background-color: #292927;
        }
      }
    }

    &.style-bordered{
      td{
        // border: 1px solid #333;
      }
    }

    &.style-big-cell{
      td{
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }

    td{
      padding-left: 15px;
      border-bottom: none;
    }
    tr{
      &.bg-gold{
        background-color: #E4B947 !important;
        color: #222;
      }
      &.head-row{
        td{
          background-color: #E4B947;
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 3px solid $bg_table;
          color: #222;

          // &:first-child{
          //   border-bottom-left-radius: 15px;
          // }
          // &:last-child{
          //   border-bottom-right-radius: 15px;
          // }
        }
      }
      &.foot-row{
        td{
          background-color: #E4B947;
          color: #222;
          padding-bottom: 4px;
        }
      }
    }

  }
</style>