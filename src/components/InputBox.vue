<template>
  <form v-on:submit.prevent="$emit('submit', $refs.input.value.trim())">
    <input ref="input" :placeholder="placeholder" @focus="$emit('focus')" :maxlength="maxlength" />
  </form>
</template>

<script>
export default {
  props: ['placeholder', 'maxlength'],
  methods: {
    focus() { this.$refs.input.focus() },
    unfocus() { this.$refs.input.blur() },
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