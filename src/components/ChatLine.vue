<template>
	<div class="line">
		<Avatar :index="data.avatar" class="vertical" />
    <b class="blue">{{data.name}}</b>:
    <span>{{data.text}}</span>
	</div>
</template>

<script>
import Avatar from './Avatar'

export default {
	props: ['data'],
	components: { Avatar }
}
</script>

<style scoped>
.line {
  margin-top: 5px;
}
.avatar {
  vertical-align: middle;
}
b {
  margin-left: -3px;
}
</style>