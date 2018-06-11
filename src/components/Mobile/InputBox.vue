<template>
  <form @submit.prevent="onSubmit">
    <input v-model="text" :placeholder="placeholder" :maxlength="maxlength" 
      :disabled="disabled || loading" ref="input"  :style="inputStyle"/>
  </form>
</template>

<script>
export default {
  props: ['placeholder', 'maxlength', 'disabled', 'loading'],
  data() { return { text: '' } },
  methods: {
    onSubmit() {
      const text = this.text.trim()
      if (text)
        this.$emit('submit', text)
    },
    focus() { this.$refs.input.focus() },
    unfocus() { this.$refs.input.blur() },
  },
  computed: {
    inputStyle() {
      if (this.loading) return { cursor: 'wait' }
      else if (this.disabled) return { cursor: 'not-allowed' }
      else return { cursor: 'text' }
    }
  },
  watch: {
    loading(newVal) {
      if (newVal)
        this.text = '載入中...'
    }
  }
}
</script>

<style scoped>
input {
  font-size: 16px;
  color: #705749;
  text-align: center;
  padding: 0px;
  margin-left: 4px;
  border: none;
  width: calc(100% - 18px);
  background-color: #9c8673;
  transition-duration: 0.25s;
  line-height: 26px;
  border: 2px solid #c19d6f;
  border-radius: 5px;
}
input::placeholder {
  top: -10px;
  color: #f8ecd5;
  vertical-align: middle;
}
input:focus {
  outline: none;
  margin-left: 0px;
  width: calc(100% - 10px);
  background-color: #f8ecd5;
}
input:focus::placeholder {
  color: #927964;
}
</style>