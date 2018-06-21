<template>
  <DialogBox overflowY="auto" :class="dialogClass">
    <div style="display:flex; align-items: flex-start;">
      <div>
        <UnderlineText><i class="far fa-smile"/> 表情貼圖</UnderlineText>
        <DarkButton @click="updateUiMode({stickerPicker:false})">
            <i class="fas fa-times" style="margin:0 2px;"/>
        </DarkButton>
        <DarkButton @click="updateUiMode({stickerPicker:false})">
          <i class="fas fa-times" style="margin:0 2px;"/>
        </DarkButton>
      </div>
      <div class="close">
        <DarkButton @click="updateUiMode({stickerPicker:false})">
          <i class="fas fa-times" style="margin:0 2px;"/>
        </DarkButton>
      </div>
    </div>
    <Well>
      <div class="grid">
        <WhiteBorder v-for="(item,i) in new Array(18)" :key="i" class="button">
          <Sticker :index="i" :category="category" :size="75"/>
        </WhiteBorder>
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import DialogBox from '../DialogBox'
import DarkButton from '../DarkButton'
import Sticker from '../Sticker'
import WhiteBorder from '../WhiteBorder'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Well, DialogBox, DarkButton, Sticker, WhiteBorder },
  data() { return { dialogClass: 'animated flipInY', category: null } },
  mounted() {
    this.$el.addEventListener("animationend", () => this.dialogClass = '')
    if (localStorage.stickerCategory)
      this.category = localStorage.stickerCategory
  },
  computed: {
  },
  methods: { ...mapMutations(['updateUiMode']) }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.close {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 0px;
}
.button {
  margin: 0 3px 3px 0;
  cursor: pointer;
}
</style>