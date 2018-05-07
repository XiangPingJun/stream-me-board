<template>
	<div class="line">
		<Thumbnail :index="data.thumbnail" class="vertical" />
    <i>{{data.name}}:</i>
    <span>{{data.text}}</span>
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
.line {
  margin-top: 5px;
}
.thumbnail {
  vertical-align: middle;
}
</style>