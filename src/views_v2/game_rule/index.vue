<template>

  <div>

    <div class="container mx-auto">

      <!-- main logo -->
      <div class="block-main-theme-logo">
        <div class="pic-title">
          <img src="~@/assets/static/img/css_img/theme-title-04-rule.png">
        </div>
      </div>

      <div class="pt-5 mt-4">

        <div class="ui-card-sp small">

          <div class="el-snow snow-left snow-c"></div>
          <!-- <div class="el-snow snow-right"></div> -->

          <h4 class="sp-title-box tac">
            <div class="title-snow-right"></div>
            {{lg('',{
              en: 'Game Rules',
              zh: '第一部分：卡牌总数、设置及费用',
            })}}
          </h4>

          <div class="row">
            <div class="col col-md-7 my-3">
              <p>
                {{lg('',{
                  en: '1. Total Number of NFT cards = 10,000.',
                  zh: '1、本系列NFT的总数目为10000张。',
                })}}
              </p>
              <p>
                {{lg('',{
                  en: '2. There are 16 different kind of NFTs, including 8 letter Cards, 3 “instant win” cards and 5 NFT collection cards, which can be traded in our coming NFT exchanges.',
                  zh: '2、本系列一共有16种不同的卡牌 – 包括8种字母卡牌（”JUGGERNAUT”对应的字母，注意G &U是两个位置出现，但是同一个字母可以通用）、3种“instant win”卡牌 (“立即获奖”卡)和5张限量版的节日NFT卡牌。',
                })}}
              </p>
              <p>
                {{lg('',{
                  en: '3. The order of the NFTs in our smart contract are randomly ranked. i.e., what you can get is designed by our smart contract and can NOT be manipulated/predicted by anyone.',
                  zh: '3、所有卡牌的顺序为任意规则排列，在智能合约里面提前设置好的，没有任何人可以修改或者调制。',
                })}}
              </p>
              <p>
                {{lg('',{
                  en: '4. When you connect with your wallet, and pay 10 JGN (AVAX) per DRAW, you will get one NFT cards. You can DRAW multiple times. As this game is on BSC, the gas fee is significantly lower than ether network. ',
                  zh: '4、每次链接钱包以后，需要支付10个JGN（AVAX）代币，就可以得到任意一张NFT卡牌。',
                })}}
                
              </p>
              <p>
                {{lg('',{
                  en: '5. There are 1 Letter T NFT cards available, 12 LETTER N, 101 LETTER R, 1100LETTER J, E & A, 2200 letter U and G.',
                  zh: '5、字母卡牌解释：本系列一共有1张字母T，11张字母N，101张字母R, 1100张字母J,E,A；2200张字母U &字母G。得到的概率如下表展示。',
                })}}
              </p>
              <p>
                {{lg('',{
                  en: '6. "instant win card" card: When you get 1 “instant card” NFT cards, you can get either 10 JGN, or 30 JGN, or 50 JGN, depends on which card that you get.',
                  zh: '6、立即获奖卡牌：只需要一张卡牌，就可以领到对应的奖品，分别有10个JGN, 30个JGN 或者50个JGN三种不同的NFT卡牌。',
                })}}
              </p>
              <p>
                {{lg('',{
                  en: '7. There are 5 brand new and different “JGN-AVAX GENESIS COLLECTION – Winter Wonderland” – limited edition, with 140 available for each NFT cards. These cards can be saved in your wallet and will be available for trading in our coming JGN NFT exchange.',
                  zh: '7、JGN-AVAX的创世NFT收藏版本：一共5种类别，每种类别限量140张。可以收集或者未来在JGN交易所进行交易。',
                })}}
              </p>
            </div>
            <div class="col col-md-5 my-3">
              <table 
                class="sp-rate-table style-row-gap small w-100 mx-auto mb-4"
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
                  <td>10,000</td>
                  <td>100.00%</td>
                </tr>
              </table>
            </div>
          </div>
        </div>


        <div class="ui-card-sp pb-5 mt-5">

          <!-- <div class="el-snow snow-left"></div> -->
          <div class="el-snow snow-right"></div>

          <h4 class="sp-title-box tac">
            <div class="title-snow-left"></div>
            {{lg('',{
              en: 'Part II: Rewards',
              zh: '第二部分：奖品',
            })}}
          </h4>

          <tableReward class="sp-rate-table style-row-gap small"/>


          <div class="mt-4 small pb-3">
            <h5 class="b mb-4">
              {{lg('',{
                en: 'There are FIVE TYPE of rewards:',
                zh: '奖品一共是五个类别:',
              })}}
              
            </h5>
            <p>
              {{lg('',{
                en: '1) When you collect “JUGGERNAUT”, you can get 8,000 JGN. Note, you need 10 respective NFT cards, which should include 1 LETTER J, LETTER E, LETTER R, LETTER N, LETTER A, LETTER T and 2 LETTER G & 2 LETTER U.',
                zh: '1) 当您集够了“JUGGERNAUT”的全拼写，就可以换购 8000个JGN。注意，一共需要10张NFT卡牌。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '2) When you collect “JGN”, you can get 1,500 JGN. Note, you need 3 respective NFT cards, which should include 1 LETTER J, LETTER G & LETTER N.',
                zh: '2) 当您集够了“JGN“的全拼写，就可以换购1500个JGN。注意，一共需要3张NFT卡牌，其中包括一张字母J，一张字母G 和一张字母N。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '3) When you collect “Jugger”, you can get 300 JGN. Note, you need 6 respective NFT cards, which should include 1 LETTER J, LETTER U, LETTER E, LETTER R and 2 LETTER G.',
                zh: '3) 当您集够了“Jugger”的全拼写，就可以换购300个JGN。注意，一共需要6张NFT卡牌。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '4) When you get 1 “instant win card” NFT card, you can get either 10 JGN, 30 JGN and 50 JGN depends on which card that you get. ',
                zh: '4) 当您得到“Instant Win”的卡牌，就可以换购10个JGN 或者 30个JGN 或者 50个JGN，你的卡牌上面会写是哪一种。',
              })}}
              
            </p>
            <p>
              {{lg('',{
                en: '5) When you get the NFT collection cards (JGN-AVAX GENESIS COLLECTION – Winter Wonderland), save them in your wallet and you can trade in our NFT exchange coming soon.',
                zh: '5) 限量版AVAX 的JGN NFT卡牌：一共5种类别，每种类别限量140张。可以收集或者未来在JGN交易所进行交易。',
              })}}
            </p>
          </div>

          <div>
            {{lg('',{
              en: 'JGN Foundation has the final say for the game rules.',
              zh: 'JGN官方拥有最后解释权',
            })}}
          </div>

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
          name: 'J',
          num: '1,100',
          rate: '11.00%',
        },
        {
          name: 'U',
          num: '2,200',
          rate: '22.00%',
        },
        {
          name: 'G',
          num: '2,200',
          rate: '22.00%',
        },
        {
          name: 'E',
          num: '1,100',
          rate: '11.00%',
        },
        {
          name: 'R',
          num: '101',
          rate: '1.01%',
        },
        {
          name: 'N',
          num: '11',
          rate: '0.11%',
        },
        {
          name: 'A',
          num: '1,100',
          rate: '11.00%',
        },
        {
          name: 'T',
          num: '1',
          rate: '0.01%',
        },
        {
          name: 'Instant Win - 50 JGN',
          num: '187',
          rate: '1.87%',
        },
        {
          name: 'Instant Win - 30 JGN',
          num: '500',
          rate: '5.00%',
        },
        {
          name: 'Instant Win - 10 JGN',
          num: '800',
          rate: '8.00%',
        },
        {
          name: 'JGN-AVAX GENESIS COLLECTION – Winter Wonderland',
          num: '700',
          rate: '7.00%',
        },
        // {
        //   name: '',
        //   num: '10,00',
        //   rate: '100.00%',
        // },
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