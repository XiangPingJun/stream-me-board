<template>
  <form v-on:submit.prevent="onSubmit">
    <input v-model="text" :placeholder="placeholder" @focus="$emit('focus')" :maxlength="maxlength" 
      :disabled="disabled || loading" ref="input"  :style="inputStyle" />
  </form>
</template>

<script>
export default {
  props: ['placeholder', 'maxlength', 'disabled', 'loading'],
  data() { return { text: '' } },
  methods: {
    onSubmit() {
      const text = this.text.trim()
      if (!text)
        return
      this.text = '載入中...'
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
  }
}
</script>

<style scoped>
input {
  font-size: 16px;
  color: #705749;
  text-align: center;
  padding: 5px;
  margin-left: 4px;
  border: none;
  box-shadow: 0px -3px #c19d6f, 0px 3px #c19d6f, 3px 0px #c19d6f,
    -3px 0px #c19d6f, -3px -3px #86674d, -3px 3px #86674d, 3px 3px #86674d,
    3px -3px #86674d;
  width: calc(100% - 18px);
  background-color: #9c8673;
  transition-duration: 0.25s;
}
input::placeholder {
  color: #f8ecd5;
}
input:focus {
  outline: none;
  margin-left: 0px;
  width: calc(100% - 10px);
  background-color: #f8ecd5;
  box-shadow: 0px -3px #f8ecd5, 0px 3px #f8ecd5, 3px 0px #f8ecd5,
    -3px 0px #f8ecd5;
}
input:focus::placeholder {
  color: #927964;
}
</style>