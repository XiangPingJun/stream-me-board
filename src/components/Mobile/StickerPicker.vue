<template>
  <Content>
    <UnderlineText><i class="far fa-smile"/> 表情貼圖</UnderlineText>
    <div style="margin:5px">
      <span v-for="(item,i) in categories" @click="pickCategory(i)" class="category-button">
        <i :class="`far fa${i==category?'-check':''}-square`"/> {{categories[i]}}
      </span>
    </div>
    <div class="grid">
      <div v-for="(item,i) in new Array(18)" class="sticker-button" @click="pickticker(i)" :key="i">
        <Sticker :index="i" :category="category" :size="stickerSize"/>
      </div>
    </div>
  </Content>
</template>

<script>
import { getWindowWidth } from '../../common'
import Content from './Content'
import Sticker from '../Sticker'
import UnderlineText from '../UnderlineText'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Content, Sticker },
  data() { return { categories: ['肥宅', '正妹'], dialogClass: 'animated flipInY', category: null } },
  mounted() {
    this.$el.addEventListener("animationend", () => this.dialogClass = '')
    this.category = localStorage.stickerCategory || 0
  },
  methods: {
    pickCategory(category) { localStorage.stickerCategory = this.category = category },
    pickticker(sticker) {
      this.sendSticker({ stickerCategory: this.category, sticker: sticker })
      this.setUiMode({ chatBox: true })
    },
    ...mapMutations(['setUiMode']), ...mapActions(['sendSticker'])
  },
  computed: {
    stickerSize() { return Math.floor((getWindowWidth() - 16) / 3) - 4 }
  }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.sticker-button {
  margin: 2px;
}
.category-button {
  margin-right: 10px;
  cursor: pointer;
}
</style>