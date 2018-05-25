<template>
  <div ref="bubble" class="cbbl" :class="{ 'cbbl--right': x > getWindowWidth/2, 'cbbl--up': y>getWindowHeight/2 }"
    :style="{ position: 'fixed', left: x+'px', top: y+'px' }"
  ><slot /></div>
</template>

<script>
import { getWindowWidth, getWindowHeight } from '../../common'

export default {
  props: ['x', 'y'],
  computed: {
    hasPosition() { return undefined != this.x || undefined != this.y },
    width() { return this.$refs.bubble.clientWidth },
    height() { return this.$refs.bubble.clientHeight },
    centerX() {
      const box = this.$refs.bubble.getBoundingClientRect()
      return box.x + box.width / 2
    },
    centerY() {
      const box = this.$refs.bubble.getBoundingClientRect()
      return box.y + box.height / 2
    },
    getWindowWidth, getWindowHeight
  }
}
</script>

<style>
.cbbl {
  position: relative;
  display: inline-block;
  margin: 10px 9px 29px 6px;
  background-color: #fff;
  color: #000;
  padding: 5px;
  box-shadow: 0 -3px #fff, 0 -6px #000, 3px 0 #fff, 3px -3px #000, 6px 0 #000,
    0 3px #fff, 0 6px #000, -3px 0 #fff, -3px 3px #000, -6px 0 #000,
    -3px -3px #000, 3px 3px #000, 3px 9px #aaa, 6px 6px #aaa, 9px 3px #aaa;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  box-sizing: border-box;
  vertical-align: top;
  max-width: 400px;
}
.cbbl::before,
.cbbl::after {
  content: "";
  display: block;
  position: absolute;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.cbbl::after {
  background: #fff;
  width: 9px;
  height: 3px;
  bottom: -14px;
}
.cbbl::before {
  width: 15px;
  height: 8px;
  background: #fff;
  bottom: -11px;
  border-left: 3px solid #000;
  border-right: 3px solid #000;
}
.cbbl::before,
.cbbl::after {
  left: 20%;
}
.cbbl::after {
  margin-left: 6px;
  box-shadow: -3px 0 #000, 3px 0 #000, 3px 3px #fff, 0px 3px #000, 6px 3px #000,
    9px 3px #aaa, 3px 6px #000, 6px 6px #000, 9px 6px #aaa, 6px 9px #aaa;
}
.cbbl.cbbl--hover:hover::after {
  box-shadow: -3px 0 #7bc8a4, 3px 0 #7bc8a4, 3px 3px #eee, 0px 3px #7bc8a4,
    6px 3px #7bc8a4, 9px 3px #cae9db, 3px 6px #7bc8a4, 6px 6px #7bc8a4,
    9px 6px #cae9db, 6px 9px #cae9db, 9px 9px #7bc8a4;
}
.cbbl--up {
  margin: 29px 9px 10px 6px;
}
.cbbl--up::before {
  top: -11px;
  bottom: auto;
}
.cbbl--up::after {
  top: -14px;
  bottom: auto;
  box-shadow: -3px 0 #000, 3px 0 #000, 3px -3px #fff, 0px -3px #000,
    6px -3px #000, 3px -6px #000, 6px -6px #000;
}
.cbbl--up.cbbl--right::after {
  box-shadow: 3px 0 #000, -3px 0 #000, -3px -3px #fff, 0px -3px #000,
    -6px -3px #000, -3px -6px #000, -6px -6px #000;
}
.cbbl--up.cbbl--right.cbbl--hover:hover::after {
  box-shadow: 3px 0 #7bc8a4, -3px 0 #7bc8a4, -3px -3px #eee, 0px -3px #7bc8a4,
    -6px -3px #7bc8a4, -3px -6px #7bc8a4, -6px -6px #7bc8a4;
}
.cbbl--right::before,
.cbbl--right::after {
  left: auto;
  right: 20%;
}
.cbbl--right::after {
  margin-left: 0;
  margin-right: 6px;
  box-shadow: 3px 0 #000, -3px 0 #000, -3px 3px #fff, 0px 3px #000,
    -6px 3px #000, -3px 6px #000, -6px 6px #000, -3px 9px #aaa, 0 6px #aaa,
    3px 3px #aaa, 6px 0px #aaa;
}
</style>
