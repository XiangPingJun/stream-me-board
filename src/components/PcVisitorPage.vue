<template>
  <div style="display:flex">
  <dialog-box>
    Test
  </dialog-box>
  <dialog-box>
    Test<br>Test<br>My<br>Dialog
  </dialog-box>
  </div>
</template>

<script>
import Well from './Well.vue'
import DialogBox from './DialogBox.vue'

export default {
  data() {
    return {}
  },
  components: {
    well: Well,
    'dialog-box': DialogBox
  },
  created() {
  }
}
</script>
