<template>


<div>
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
<van-button type="primary" @click="onSubmit">去登录页面</van-button>
</div>
</template>

<script>

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
