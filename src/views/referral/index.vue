<template>
  <div class="container-lg mx-auto pb-5">
    
    <div class="py-4">
      <h1 class="tac mb-4">
        {{lg('referral_lianjie')}}
      </h1>

      <div class="input-group mx-auto" style="max-width: 900px;">
        <input 
          type="text" 
          v-model="referral_link" 
          readonly 
          class="form-control" 
          style="border-right: none; font-size: 14px;padding: 25px 10px;" 
          placeholder=""
          >
        <div class="input-group-append" style="border-left: none;">
          <span 
            v-clipboard:copy="referral_link" 
            v-clipboard:success="copied"
            class="btn btn-primary px-4" 
            style="line-height: 38px;"
            >
            {{lg('copy')}}
          </span>
        </div>
      </div>
    </div>

    <div class="py-4 mx-auto" style="max-width: 700px;">
      <h1 class="tac mb-4">
        {{lg('dashboard')}}
      </h1>

      <div class="card p-4 tac">
        <div class="c py-3" style="font-size: 1.8em;">
          {{lg('invited')}}
        </div>
        <div class="c">
          <span style="font-size: 1.3em;">
            {{num_invited_people | qfw}} 
          </span>
          {{lg('people_yaoqing')}}
        </div>
        <div class="c">
          {{lg('your_level')}}: {{my_level}}
        </div>
        <div class="mt-4">
          <span style="font-size: 1.3em;">
            {{num_invited_token | qfw}} 
          </span>
          jXP
        </div>
        <div v-if="$store.state.web3.account" class="pt-3">
          <button @click="claim" class="btn btn-primary">
            Claim
          </button>
        </div>
      </div>

      <div class="card p-4 tac mx-auto mt-5">
        <h3 class="tac mb-4">
          {{lg('',{
            en: 'Invitation description',
            zh: '邀请描述',
          })}}:
        </h3>
        <div>
          {{lg('',{
            en: 'Step1. Copy your invitation link and send it to friends',
            zh: '步骤一：复制您的邀请链接并发送给您的朋友',
          })}}
          <br>
          {{lg('',{
            en: 'Step2. You will get rewards if your friends bind addresses to participate in mining',
            zh: '步骤二：当您的朋友绑定钱包地址并参与挖矿，你将获得奖励',
          })}}
        </div>

        <h5 class=" mt-5 mb-3">
          {{lg('',{
            en: 'Notice',
            zh: '注意',
          })}}:
        </h5>
        <div class="">
          {{lg('',{
            en: '1. 您的邀请奖励级别是按照您过去成功邀请链接所质押的JGN数目',
            zh: '1. 您的邀请奖励级别是按照您过去成功邀请链接所质押的JGN数目',
          })}}
          <br>
          {{lg('',{
            en: '2. 您的奖励是按照您邀请人所获得的奖励代币来计算的。比如，若矿池是质押JGN，得到jXP，若您的级别是VIP2级，若您邀请人共获得1000个jXP，那么您会得到10%X1000 = 100jXP的奖励。',
            zh: '2. 您的奖励是按照您邀请人所获得的奖励代币来计算的。比如，若矿池是质押JGN，得到jXP，若您的级别是VIP2级，若您邀请人共获得1000个jXP，那么您会得到10%X1000 = 100jXP的奖励。',
          })}}
        </div>

        <h3 class="tac mb-4 mt-5">
          {{lg('',{
            en: 'Referral bonus',
            zh: '邀请奖励',
          })}}
        </h3>
        <div>
          <table class="w-100 table-bordered">
            <tr class="b">
              <td>
                {{lg('',{
                  en:'Cumulative JGN',
                  zh: '累计邀请参与JGN数目',
                })}}
              </td>
              <td>
                {{lg('',{
                  en:'Level',
                  zh: '等级',
                })}}
              </td>
              <td>
                {{lg('',{
                  en:'Bonus',
                  zh: '奖励',
                })}}
              </td>
            </tr>
            <tr
              v-for="(item,index) of data_level_table" 
              :key="index">
              <td>{{item.cumulative_jgn}}</td>
              <td>{{item.level}}</td>
              <td>{{item.bonus}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'referral',
  components: {},
  props: [],
  data() {
    return {
      referral_link: '-',
      num_invited_people: '-',
      num_invited_token: '-',
      my_level: '-',

      data_level_table: [
        {
          level: 'VIP1',
          bonus: '5%',
          cumulative_jgn: '0 ~ 100,000',
        },
        {
          level: 'VIP2',
          bonus: '10%',
          cumulative_jgn: '100,001 ~ 300,000',
        },
        {
          level: 'VIP3',
          bonus: '20%',
          cumulative_jgn: '300,001 ~ 500,000',
        },
        {
          level: 'VIP4',
          bonus: '30%',
          cumulative_jgn: '500,001 ~ 500,001',
        },
        {
          level: 'VIP5',
          bonus: '40%',
          cumulative_jgn: '1,000,000+',
        },
      ],
    }
  },
  computed: {},
  watch: {
    '$store.state.web3.account'(){
      this.run()
    },
  },
  methods: {
    
    ...mapActions([
      'claimRefer',
      'getReferEarned',
      'getReferNum',
      'getReferLevel',
    ]),

    async claim(){
      let v = this
      let my_address = v.$store.state.web3.account

      await v.claimRefer()

      // v.run()
    },

    calcLink(){
      let v = this
      let my_address = v.$store.state.web3.account
      // console.log(v)
      my_address = v.util.base32encode(my_address)
      let url = window.location.origin + '?referral=' + my_address
      this.referral_link = url
    },


    copied(){
      this.$toasted.show(this.lg('copied'))
    },

    async queryNumInvitedToken(){
      let v = this
      let my_address = v.$store.state.web3.account

      let num = await v.getReferEarned(my_address)
      v.num_invited_token = num
    },
    async queryNumInvitedPeople(){
      let v = this
      let my_address = v.$store.state.web3.account
      
      let num = await v.getReferNum(my_address)
      v.num_invited_people = num
    },

    async queryLevel(){
      let v = this
      let my_address = v.$store.state.web3.account

      let level = await v.getReferLevel(my_address)
      v.my_level = level
    },

    run(){
      let v = this

      this.calcLink()

      let my_address = v.$store.state.web3.account
      if(!my_address){
        return
      }
      
      this.queryNumInvitedToken()
      this.queryNumInvitedPeople()
      this.queryLevel()
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