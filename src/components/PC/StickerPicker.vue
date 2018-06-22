<template>
  <DialogBox overflowY="auto" :class="dialogClass">
    <div style="display:flex; align-items: flex-start;">
      <UnderlineText>表情貼圖</UnderlineText>
      <div class="close">
        <DarkButton @click="updateUiMode({stickerPicker:false})">
          <i class="fas fa-times" style="margin:0 2px;"/>
        </DarkButton>
      </div>
    </div>
    <div style="margin:5px">
      <span v-for="(item,i) in categories" @click="pickCategory(i)" class="category-button">
        <i :class="`far fa${i==category?'-check':''}-square`"/> {{categories[i]}}
      </span>
    </div>
    <div class="grid">
      <div v-for="(item,i) in new Array(18)" class="sticker-button" @click="pickticker(i)" :key="i">
        <Sticker :index="i" :category="category" :size="90"/>
      </div>
    </div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import DialogBox from '../DialogBox'
import DarkButton from '../DarkButton'
import WhiteBorder from '../WhiteBorder'
import Sticker from '../Sticker'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: { UnderlineText, Well, DialogBox, DarkButton, Sticker },
  data() { return { categories: ['肥宅', '正妹'], dialogClass: 'animated flipInY', category: null } },
  mounted() {
    this.$el.addEventListener("animationend", () => this.dialogClass = '')
    this.category = localStorage.stickerCategory || 0
  },
  methods: {
    pickCategory(category) { localStorage.stickerCategory = this.category = category },
    pickticker(sticker) {
      this.sendSticker({ stickerCategory: this.category, sticker: sticker })
      this.updateUiMode({ stickerPicker: false })
    },
    ...mapMutations(['updateUiMode']), ...mapActions(['sendSticker'])
  }
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
.sticker-button {
  padding: 2px;
  margin: 2px;
  cursor: pointer;
  transition: outline 0.2s linear;
  outline: 2px solid rgba(193, 157, 111, 0);
}
.sticker-button:hover {
  outline: 2px solid rgba(193, 157, 111, 255);
}
.category-button {
  margin-right: 10px;
  cursor: pointer;
}
</style>