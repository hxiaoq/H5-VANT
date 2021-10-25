<template>
  <div class="login-container">
    <van-form autocomplete="off" @submit="onSubmit">
      <van-field v-model.trim="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model.trim="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field } from 'vant'
export default {
  name: 'Login',
  components: {
    [Form.name]: Form,
    [Field.name]: Field
  },
  data() {
    return {
      username: '',
      password: '',
      redirect: undefined
    }
  },
  computed: {},
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      this.$store
        .dispatch('user/login', values)
        .then((res) => {
          this.$toast({
            type: 'success',
            message: res.message,
            duration: 500,
            onClose: () => {
              this.$router.push({ path: this.redirect || '/' })
            }
          })
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.van-form {
  width: 100%;
}
</style>
