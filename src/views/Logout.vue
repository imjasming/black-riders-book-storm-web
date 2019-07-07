<template>

</template>

<script>
  export default {
    name: "Logout",
    created() {
      this.$store.dispatch('logout').then(() => {
        this.$Message.success({
          content: '退出登录成功',
          duration: 8
        })
        this.$router.push('/')
      })
    }
  }
</script>

<style scoped>

</style>
