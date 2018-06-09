<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>直播結束囉！來看看過去的直播吧！</UnderlineText></div>
    <a @click.stop.prevent="updateUiMode({followUs:true})">
      <i class="far fa-hand-point-right"/> 如何追蹤我們的頻道？ <i class="far fa-hand-point-left"/>
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
import Button from '../Button'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Well, Button, DialogBox, WhiteBorder },
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