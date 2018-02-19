<template>
  <background :offsetX="offsetX" :offsetY="offsetY" />
</template>

<script>
import PageBackground from "./PageBackground";

export default {
  data() {
    return {
      offsetX: 0,
      offsetY: 0
    };
  },
  components: {
    background: PageBackground
  },
  created() {
    document.addEventListener("mousemove", this.mousemove);
  },
  methods: {
    mousemove(event) {
      this.offsetX = event.clientX / window.innerWidth;
      this.offsetY = event.clientY / window.innerHeight;
    },
    timeout() {
      this.offsetX += 0.001;
    }
  }
};
</script>
