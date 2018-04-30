<template>
	<div>
		<div class="nickname">
			<Thumbnail index="12" /><span>油炸可樂</span><Thumbnail index="12" />：
		</div>
		<div class="msg">我還追了強殖裝甲 一堆都不知道我死之前能不能完結的作品</div>
	</div>
</template>

<script>
import Thumbnail from './Thumbnail'

export default {
	components: { Thumbnail }
}
</script>

<style scoped>
.nickname {
  display: inline-flex;
  align-items: center;
}
.nickname > span {
  margin: 4px;
}
.msg {
  margin-bottom: 3px;
}
</style>