<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>選擇您的角色： (已獲得{{myInfo.thumbnailList.length}}/{{totalThumbnail}})</UnderlineText></div>          
    <Well>
			<div class="grid">
        <ThumbnailPickerBtn v-for="thumbnail in thumbnailList" :index="thumbnail" :key="thumbnail" :whoAmI="!myInfo.thumbnailList.includes(thumbnail)" />
			</div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import ThumbnailPickerBtn from './ThumbnailPickerBtn'
import Button from '../Button'
import DialogBox from '../DialogBox'
import { mapGetters } from 'vuex'

export default {
  components: { UnderlineText, Well, ThumbnailPickerBtn, Button, DialogBox },
  computed: {
    thumbnailList() {
      const list = [...this.myInfo.thumbnailList]
      for (let i = 0; i < this.myInfo.thumbnailList; i++)
        if (!this.myInfo.thumbnailList.includes(i))
          list.push(i)
      return list
    },
    ...mapGetters(['myInfo', 'totalThumbnail'])
  }
}
</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>