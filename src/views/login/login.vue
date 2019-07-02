<template>
  <div class="form-container">
    <el-card class="box-card title-pane">
      <div slot="header" class="clearfix">
      </div>
      <div class="text item">
        <span></span>
      </div>
    </el-card>
    <el-form id="loginForm" class="input-form"
             status-icon
             label-width="6rem"
             :model="loginForm"
             ref="loginForm"
             :rules="loginRoles">
      <el-form-item prop="username" label="用户名">
        <el-input type="text" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click.native.prevent="redirectToSIgnUp">注册</el-button>
      </el-form-item>
      <el-form-item class="link-button" v-for="item in oauthList" :key="item.clientName">
        <a :href="item.clientUrl">{{item.clientName}}</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {passwordRule, usernameRule} from '@/utils/validator'
  import {fetch} from '@/utils/axios'

  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRoles: {
          username: [{require: true, trigger: 'blur', validator: usernameRule}],
          password: [{require: true, trigger: 'blur', validator: passwordRule}]
        },
        loading: false,
        oauthList: [],
      }
    },
    created () {
      this.checkToken()
    },
    mounted () {
      this.getOauthClients()
    },
    methods: {
      checkToken () {
        const token = this.$route.query.token
        const tokenType = this.$route.query.tokenType
        const username = this.$route.query.user
        if (token && username) {
          this.$store.dispatch('initAccessToken', {'username': username, 'token': token, 'tokenType': tokenType})
            .then(() => {
              this.$router.push({name: 'profile'})
            }).catch(error => {

          })
        }
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({name: 'profile'})
            }).catch(() => {
              this.loading = false
            })
          } else {

            return false
          }
        })
      },
      redirectToSIgnUp () {
        this.$router.push({path: '/register'})
      },
      getOauthClients () {
        fetch('/auth/oauth2-client').then(data => {
          this.oauthList = data
        })
      }
    }
  }
</script>

<style scoped>
  #loginForm {
    margin: auto;
  }

</style>
