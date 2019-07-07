<template>
  <div class="box fix-header">
    <div class="nav">
      <div id="logo">
        <router-link to="/">
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
        <Dropdown v-if="isLogin">
          <Badge :count="messageCount" v-if="messageCount > 0">
            <Avatar :src="userAvatar"></Avatar>
          </Badge>
          <Badge dot v-else>
            <Avatar :src="userAvatar"></Avatar>
          </Badge>
          <Icon type="ios-arrow-down"/>
          <DropdownMenu slot="list">
            <DropdownItem v-for="item in dropdownMenuList" :key="item.id">
              <router-link :to="item.path">
                {{item.name}}
              </router-link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div v-else class="header-link">
          <router-link to="login">cnm，请登录</router-link>
          |
          <router-link to="SignUp">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

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
          },
          {
            id: 2,
            path: '/logout',
            name: '退出登录'
          }
        ]
      };
    },
    computed: {
      isLogin() {
        const token = this.$store.getters.token
        const userInfo = this.$store.getters.userInfo
        return !!(token && token !== '' && userInfo);
      }

    }, created() {
    },
    mounted() {
      //window.addEventListener('scroll', this.setHeader)
    },

    methods: {
      setHeader() {
        const top = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset;
        if (top > 40) {
          this.fixHeader = 'fix-header'
        } else {
          this.fixHeader = ''
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  $color-primary: #409EFF;

  .header-link {
    a {
      margin: 0 4px;
    }
  }

  div .ivu-select-dropdown {
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
