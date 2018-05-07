<template>
	<div>
		<div class="nickname">
			<Thumbnail :index="data.thumbnail" /><span>{{data.name}}</span><Thumbnail :index="data.thumbnail" />：
		</div>
		<div class="text">{{data.text}}</div>
	</div>
</template>

<script>
import Thumbnail from './Thumbnail'

export default {
	props: ['data'],
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
.text {
  margin-bottom: 3px;
}
</style>