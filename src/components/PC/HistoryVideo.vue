<template>
  <DialogBox overflowY="auto" :class="dialogClass">
    <div><UnderlineText>直播結束囉！來看看過去的直播吧！</UnderlineText></div>
    <a @click="updateUiMode({followUs:true})">
      <i class="fas fa-bell"/> 如何追蹤我們的頻道？
    </a>
    <Well>
			<div class="grid">
				<WhiteBorder v-for="(video, i) in historyVideo" :key="i" style="margin: 0 5px 10px 0;">
					<div class="thumbnail" @click="playHistory(video.id.videoId)" v-tooltip.bottom="{content:video.snippet.title, offset:3}">
						<img :src="video.snippet.thumbnails.default.url"/>
					</div>
				</WhiteBorder>
			</div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  data() { return { dialogClass: 'animated flipInY' } },
  mounted() { this.$el.addEventListener("animationend", () => this.dialogClass = '') },
  components: { UnderlineText, Well, DialogBox, WhiteBorder },
  computed: { ...mapState(['historyVideo']) },
  methods: { ...mapActions(['playHistory']), ...mapMutations(['updateUiMode']) }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.thumbnail {
  width: 120px;
  height: 68px;
  overflow: hidden;
  cursor: pointer;
}
.thumbnail img {
  margin-top: -11px;
}
</style>