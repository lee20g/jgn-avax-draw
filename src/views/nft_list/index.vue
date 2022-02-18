<template>
  <Container class="tac">

    <div class="my-5 b d-flex align-items-center justify-content-center">
      <img src="/static/jgnlog.jpg" style="width: 80px;height: 100px;">
      <span class="b ml-3 pc-fs-3em mb-fs-2em">
        JGN NFT Marketplace
      </span>
    </div>

    <div class="mt-5 mb-4">
      <div class="mb-2 c">
        NFT Collections
      </div>
      <h1>
        Choose a Farm
      </h1>
    </div>

    <div class="farm-list">

      <div v-for="(item,index) of list" :key="index" :class="['card p-4',item.theme]">
        <h3 class="mb-0">
          {{lg('',item.name)}}
        </h3>
        <div :class="['c',item.theme]">
          {{lg('',item.des)}}
        </div>
        <div>
          <router-link :to="item.path" :class="['btn btn-primary mt-3',item.theme]">
            Enter
          </router-link>
        </div>
      </div>

    </div>
    
    
  </Container>
</template>

<script>

export default {
  name: 'nftList',
  components: {},
  props: [],
  data() {
    return {
      list: [
        {
          path: '/nft',
          theme: '',
          name: {
            en: 'jXP Genesis NFT Marketplace',
            zh: '',
          },
          des: {
            en: 'Acquire NFTs with jXP tokens',
            zh: '',
          },
        },
        {
          path: '/nft2',
          theme: 'pink',
          name: {
            en: 'The Beauty in Decay',
            zh: '',
          },
          des: {
            en: 'Exclusive JGN NFT Collection',
            zh: '',
          },
        },
      ],
    }
  },
  computed: {},
  watch: {
    
  },
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
  @import '~@/assets/css/vars.scss';

  .farm-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .card{
      width: 48%;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }

  @media(max-width: 788px){

    .farm-list{
      .card{
        width: 90%;
      }
    }
  }


</style>