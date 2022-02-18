<template>
  <div class="topnav-box mb-4">
    <nav id="topnav" class="topnav width-full pt-3">
      <Container>
        <div class="d-flex flex-items-center align-items-center flex-wrap">

          <router-link to="/">
            <img 
              src="~@/assets/static/img/css_img/main_logo_bsc.png" 
              class="mb-3" style_="height: 40px;"
              style="height: 45px;"
              >
          </router-link>

          <!-- nav -->
          <div 
            class="pc-ml-auto mb-3 main-nav usn flex-auto d-flex flex-items-center align-items-center flex-wrap"
            style="font-size: 1.4em;"
            >

            <!-- home link 无链接  -->
            <router-link
              to="/"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'Home',
                zh: '',
              })}}
            </router-link>

            <router-link
              :to="{name: 'my_collection'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'My Collection',
                zh: '',
              })}}
            </router-link>

            <router-link
              :to="{name: 'reward'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'Rewards',
                zh: '',
              })}}
            </router-link>

            <router-link
              :to="{name: 'game_rule'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'Game Rules',
                zh: '',
              })}}
            </router-link>

            <!-- <router-link
              :to="{name: 'draw'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'Draw',
                zh: '抽奖',
              })}}
            </router-link> -->

            <!-- <router-link
              :to="{name: 'exchange'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'Exchange',
                zh: '奖品置换',
              })}}
            </router-link> -->


            <!-- <router-link
              :to="{name: 'about'}"
              class="d-inline-block d-flex align-items-center"
              >
              {{lg('',{
                en: 'About说明',
                zh: '',
              })}}
            </router-link> -->

          </div>
          
          <!-- account -->
          <div :key="web3.account" class="pc-ml-auto_x ml-2 mb-3 d-flex align-items-center align-items-center">

            <!-- <a class="b mr-3" style="font-size: 20px;" target="_blank" href="https://juggerswap.jgndefi.com/staking/">
              OLD POOLS
            </a> -->

            <div v-if="$auth.isAuthenticated && !wrongNetwork">

              <!-- <router-link 
                :to="{name: 'nftMy'}" 
                class="mr-2 ui-btn outlined w-100__x">
                My Collections
              </router-link> -->

              <template v-if="$auth.isAuthenticated && !wrongNetwork">
                <button
                  @click="modalOpen = true"
                  :loading="loading"
                  class="ui-btn outlined w-100__x"
                >
                  <Avatar :address="web3.account" size="16" class="mb-none mr-2 ml-n1" />
                  <span v-if="web3.name" v-text="web3.name" />
                  <span v-else v-text="_shorten(web3.account)" />
                </button>
              </template>

            </div>

            <button
              v-if="web3.injectedLoaded && wrongNetwork"
              @click="modalOpen = true"
              class="text-red ui-btn outlined"
            >
              <Icon name="warning" class="ml-n1 mr-1 v-align-middle" />
              Wrong network
            </button>

            <button
              class="ui-btn outlined"
              v-if="showLogin"
              @click="modalOpen = true"
              :loading="loading"
            >
              {{lg('connect_wallet')}}
            </button>

            <!-- about -->
            <!-- <button  @click="modalAboutOpen = true" class="ui-btn outlined ml-2">
              <span v-text="'?'" class="ml-n1 mr-n1" />
            </button> -->

          </div>

          <TopNavLangSelect class="ml-3 mb-3"/>
        </div>

        <ModalAccount
          :open="modalOpen"
          @close="modalOpen = false"
          @login="handleLogin"
        />
        <ModalAbout :open="modalAboutOpen" @close="modalAboutOpen = false" />

        <!-- <hr class="colored"> -->
      </Container>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import bus from '@/bus.js';

export default {
  data() {
    return {
      // jj 按钮loading效果
      loading: false,
      
      modalOpen: false,
      modalAboutOpen: false
    };
  },
  computed: {
    wrongNetwork() {
      // console.log('======wrongNetwork======')
      // console.log(this.config.chainId,this.web3.injectedChainId)
      return this.config.chainId !== this.web3.injectedChainId;
    },
    showLogin() {
      return (
        (!this.$auth.isAuthenticated && !this.web3.injectedLoaded) ||
        (!this.$auth.isAuthenticated && !this.wrongNetwork)
      );
    },
  },
  methods: {
    ...mapActions(['login']),

    async handleLogin(connector) {
      this.modalOpen = false;
      this.loading = true;
      await this.login(connector);
      this.loading = false;
    }
  },
  created(){
    bus.topnavvue = this
  },
};
</script>

<style lang="scss" scope>
  @import '@/assets/css/vars.scss';

  .topnav-box{
    background-color: #344A7B;
    .topnav{
      .main-nav{

        a{
          font-size: 17px;
          color: #fff;
          height: 20px;
          line-height: 20px;
          padding: 0 20px; 

          &:hover{
            color: $c !important;
          }

          &.router-link-exact-active{
            color: $c;
          }

          &:first-child{
          }
          &:last-child{
            border-right: none;
          }

          border-right: 1px solid #666;
        }
      }
    }
  }
  
  @media(max-width: 788px){
    .topnav-box{
      .topnav{
        .main-nav{
          img{
            height: 24px;
          }
        }
      }

      .d-flex{
        justify-content: center;
      }
    }
  }
</style>
