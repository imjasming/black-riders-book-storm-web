<template>
  <div class="box" :class="fixHeader">
    <div class="nav">
      <div id="logo">
        <router-link to="/home">
          <div class="logo-container">
            <div class="logo-img">
              <img src="../../assets/logo.png"/>
            </div>
            <div class="logo-content">
              <p>{{appName}}</p>
            </div>
          </div>
        </router-link>
      </div>
      <Form ref="searchForm" :model="searchForm" inline>
        <Input type="text" v-model="searchForm.query" placeholder="搜索图书"></Input>
      </Form>
      <div>
        <Dropdown>
          <Badge :count="messageCount" v-if="messageCount > 0">
            <Avatar :src="userAvatar"></Avatar>
          </Badge>
          <Badge dot v-else>
            <Avatar :src="userAvatar"></Avatar>
          </Badge>
          <Icon type="ios-arrow-down" />
          <DropdownMenu slot="list">
            <DropdownItem v-for="item in dropdownMenuList" :key="item.id">
              <router-link :to="item.path">
                {{item.name}}
              </router-link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/vuex/store';
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'M-Header',
    data() {
      return {
        searchForm: {
          query: ''
        },
        appName: 'BOOK STORM',
        messageCount: 0,
        userAvatar: require('../../assets/avatar.png'),
        fixHeader: '',
        dropdownMenuList: [
          {
            id: 0,
            path: '/home',
            name: '账号管理'
          },
          {
            id: 1,
            path: '/order',
            name: '购物车'
          }
        ]
      };
    },
    created() {
      this.isLogin();
    },
    mounted() {
      window.addEventListener('scroll', this.setHeader)
    },
    computed: {
      ...mapState(['userInfo', 'shoppingCart'])
    },
    methods: {
      ...mapActions(['signOut', 'isLogin']),
      setHeader() {
        const top = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset;
        if (top > 40) {
          this.fixHeader = 'fix-header'
        } else {
          this.fixHeader = ''
        }
      },
      changeCity(city) {
        this.city = city;
      },
      goToPay() {
        this.$router.push('/order');
      },
      myInfo() {
        this.$router.push('/home');
      },
      signOutFun() {
        this.signOut();
        this.$router.push('/');
      }
    },
    store
  };
</script>

<style lang="scss" scoped>
  $color-primary: #409EFF;

  div .ivu-select-dropdown{
    border-radius: 0;
  }
  .fix-header {
    position: fixed;
    top: 0;
    left: 0;
  }

  #logo {
    a {
      padding: 0;
      border: hidden;
    }
  }

  .logo-container {
    height: 40px;
    font-size: 1.4rem;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: start;
  }

  .logo-content {
    margin-top: auto;
  }

  .logo-img {
    height: 40px;

    img {
      max-height: 100%;
    }
  }

  .box {
    width: 100%;
    height: 40px;
    background-color: #fff;
    z-index: 999;
    box-shadow: 0 0 8px #000;
  }

  .nav {
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .nav ul {
    list-style: none;
  }

  .nav li {
    font-size: 14px;
    line-height: 35px;
    font-weight: bold;
  }

  .nav a {
    text-decoration: none;
    color: #999999;
    width: 100%;
    cursor: pointer;
  }

  .location a {
    border-left: none;
  }

  .nav a:hover {
    color: #d9534f;
  }
</style>
