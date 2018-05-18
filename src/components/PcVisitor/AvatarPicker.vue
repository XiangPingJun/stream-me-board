<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>選擇您的角色： (已獲得{{myInfo.avatarList.length}}/{{totalAvatar}})</UnderlineText></div>          
    <Well>
			<div class="grid">
        <AvatarPickerBtn v-for="avatar in avatarList" 
          :index="avatar" :key="avatar" 
          :whoAmI="!myInfo.avatarList.includes(avatar)" 
        />
			</div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import AvatarPickerBtn from './AvatarPickerBtn'
import Button from '../Button'
import DialogBox from '../DialogBox'
import { mapGetters } from 'vuex'

export default {
  components: { UnderlineText, Well, AvatarPickerBtn, Button, DialogBox },
  computed: {
    avatarList() {
      const list = [...this.myInfo.avatarList]
      for (let i = 0; i < this.totalAvatar; i++)
        if (!this.myInfo.avatarList.includes(i))
          list.push(i)
      return list
    },
    ...mapGetters(['myInfo', 'totalAvatar'])
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