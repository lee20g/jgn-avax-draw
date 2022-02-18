<template>
  <div 
    v-if="cfg.status" 
    class="ui-reward d-flex align-items-center justify-content-center"
    @click="hide()"
    >
    
    <div class="block-chest">

      <div class="chest-bg"></div>

      <div class="chest-img">
        <img v-if="status === 'loading'" src="./chest_01.png" class="fx-shake">
        <img v-if="status === 'done'" src="./chest_02.png">
      </div>

      <div class="reward-pic">
        <img :src="require(`../../../assets/pic/card/${cfg.reward_pic?cfg.reward_pic:'_empty.png'}`)" class="fx-jump">
      </div>
    </div>
  </div>
</template>

<script>

export default {

  name: 'drawFx',
  components: {},
  props: [
    'conf',
  ],
  data() {
    return {
    }
  },
  computed: {
    cfg(){
      return this.conf || {}
    },
    status(){
      // 'loading' or 'done'
      return this.cfg.status || 'loading'
    },
    reward_pic(){
      return this.cfg.reward_pic || ''
    },
  },
  watch: {
    'cfg.status'(val){
      if(!val){
        this.cleanState()
      }
    },
  },
  methods: {
    hide(){
      if(this.conf.status == 'done'){
        this.conf.status = ''
        this.$router.push('/my_collection')
      }
    },

    cleanState(){
      this.conf.reward_pic = ''
    },
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
  .ui-reward{
    position: relative;
    z-index: 1;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);

    .block-chest{
      width: 500px;
      height: 500px;
      max-width: 110%;
      position: relative;

      text-align: center;
      line-height: 500px;

      .chest-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('./chest_bg.png') center center no-repeat;
        background-size: 120%;
        animation: picrotate 12s infinite linear;
      }

      .chest-img{
        display: inline-block;
        position: relative;
        width: 250px;
        height: 250px;
        z-index: 1;

        img{
          width: 100%;
        }
      }

      .reward-pic{
        width: 130px;
        position: absolute;
        z-index: 9;

        bottom: 85px;
        left: 50%;
        margin-left: -65px;
        img{
          max-width: 100%;
        }
      }
    }
  }

  .fx-shake{
    animation: picshake 2s infinite linear;
  }
  .fx-jump{
    animation: picjump 1.5s infinite linear;
  }

  @keyframes picrotate {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }

  @keyframes picjump {
    0% {transform: translateY(0);}
    50% {transform: translateY(-10px);}
    0% {transform: translateY(0);}
  }

  @keyframes picshake {
    0% {transform:scale(1);}
    10%,20% {transform:scale(0.95) rotate(-3deg);}
    30%,50%,70%,90% {transform:scale(1.05) rotate(3deg);}
    40%,60%,80% {transform:scale(1.05) rotate(-3deg);}
    100% {transform:scale(1) rotate(0);}
  }
</style>