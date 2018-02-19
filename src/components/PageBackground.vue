<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export const bgImageTouples = [
  { name: 'cake', count: 6 },
  { name: 'castle', count: 7 },
  { name: 'clouds', count: 9 },
  { name: 'hills', count: 7 },
]
export default {
  props: ['offsetX', 'offsetY'],
  data() {
    return {
      images: [],
      offset: { x: 0.5, y: 0.5 }
    }
  },
  created() {
    document.body.style.backgroundColor = "blue"

    this.setRandomImage()
  },
  methods: {
    setRandomImage() {
      this.setImage(bgImageTouples[0])
    },
    setImage(imageTouple) {
      this.images = []
      for (let i = 0; i < imageTouple.count; i++) {
        const img = new Image()
        img.src = require(`../assets/image/parallaxBackground/${imageTouple.name}/${i}.png`)
        this.images.unshift(img)
      }
    },
    moveImage(offset) {
      this.$refs.canvas.width = document.body.clientWidth
      this.$refs.canvas.height = document.body.clientHeight
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      this.offset = { ...this.offset, ...offset }
      //context.clearRect(0, 0, 100, 100)
      const position = []
      this.images.forEach((img, i) => {
        const factor = (this.images.length - i - 1) * 5
        //console.log(factor * (this.offset.x - 0.5), factor * (this.offset.y - 0.5))
        //context.drawImage(img, 100 + factor * (this.offset.x - 0.5), 100 + factor * (this.offset.y - 0.5))
        //context.drawImage(img, factor * (this.offset.x - 0.5), factor * (this.offset.y - 0.5))
        context.drawImage(img, factor * (this.offset.x - 0.5), factor * (this.offset.y - 0.5), canvas.width, canvas.height)
      })
    }
  },
  watch: {
    offsetX: function (newVal, oldVal) {
      this.moveImage({ x: newVal })
    },
    offsetY: function (newVal, oldVal) {
      this.moveImage({ y: newVal })
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
