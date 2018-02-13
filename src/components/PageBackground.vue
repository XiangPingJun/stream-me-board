<template></template>
<script>
export const bgImages = [
  { name: 'cake', count: 6 },
  { name: 'castle', count: 7 },
  { name: 'clouds', count: 9 },
  { name: 'hills', count: 7 },
]
export default {
  props: ['offsetX', 'offsetY'],
  data() {
    return {
      image: '',
      offset: { x: 0.5, y: 0.5 }
    }
  },
  methods: {
    setRandomImage() {
      //      this.setImage(bgImages[Math.floor(Math.random() * bgImages.length)])
      this.setImage(bgImages[0])
    },
    setImage(image) {
      const src = [], size = []
      for (let i = 0; i < image.count; i++) {
        const path = require(`../assets/image/parallaxBackground/${image.name}/${i}.png`)
        src.push(`url(${path})`)
        size.push(`${100 + (image.count - i - 1) * 0.5}vw`)
      }
      this.image = image
      document.body.style.backgroundImage = src.join(',')
      document.body.style.backgroundSize = size.join(',')
    },
    moveImage(offset) {
      this.offset = { ...this.offset, ...offset }
      const position = []
      for (let i = 0; i < this.image.count; i++) {
        const factor = (this.image.count - i - 1) * 0.25
        position.push(`${100 + factor * (this.offset.x - 0.5)}vw ${100 + factor * (this.offset.y - 0.5)}vh`)
      }
      document.body.style.backgroundPosition = position.join(',')
    }
  },
  watch: {
    offsetX: function (newVal, oldVal) {
      this.moveImage({ x: newVal })
    },
    offsetY: function (newVal, oldVal) {
      this.moveImage({ y: newVal })
    }
  },
  created() {
    this.setRandomImage()
  }
}
</script>

<style>
@keyframes moveing-bg {
  0% {
    background-position-x: 95vw, 96vw, 97vw, 98vw, 99vw;
  }
  100% {
    background-position-x: 109vw, 108vw, 107vw, 106vw, 105vw;
  }
}
body {
  animation-name: moveing-bg;
  animation-duration: 10s;
  animation-direction: reverse;
  animation-timing-function: linear;
}
</style>