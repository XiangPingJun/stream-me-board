<template>
  <form @submit.prevent="onSubmit">
    <input v-model="text" :placeholder="placeholder" @focus="$emit('focus')" :maxlength="maxlength" 
      :disabled="disabled || loading" ref="input" :style="inputStyle"/>
    <i v-if="icon" class="icon" :class="icon" @click="$emit('iconClick')" v-tooltip.left="{content:iconTip}"/>
  </form>
</template>

<script>
export default {
  props: ['placeholder', 'maxlength', 'disabled', 'loading', 'icon', 'iconTip'],
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
      let style = { cusor: 'text' }
      if (this.icon)
        style['padding-right'] = '25px'
      if (this.loading)
        style.cursor = 'wait'
      else if (this.disabled)
        style.cursor = 'not-allowed'
      return style
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
  padding: 5px;
  margin-left: 4px;
  border: none;
  box-shadow: 0px -3px #c19d6f, 0px 3px #c19d6f, 3px 0px #c19d6f,
    -3px 0px #c19d6f, -3px -3px #86674d, -3px 3px #86674d, 3px 3px #86674d,
    3px -3px #86674d;
  width: calc(100% - 38px);
  background-color: #9c8673;
  transition-duration: 0.25s;
}
input::placeholder {
  color: #f8ecd5;
  vertical-align: middle;
}
input:focus {
  outline: none;
  margin-left: 0px;
  width: calc(100% - 30px);
  background-color: #f8ecd5;
  box-shadow: 0px -3px #f8ecd5, 0px 3px #f8ecd5, 3px 0px #f8ecd5,
    -3px 0px #f8ecd5;
}
input:focus::placeholder {
  color: #927964;
}
.icon {
  position: absolute;
  top: 0px;
  right: 2px;
  color: #f8ecd5;
  text-shadow: none;
  cursor: pointer;
  padding: 5px;
}
input:focus + .icon {
  color: #927964;
}
</style>