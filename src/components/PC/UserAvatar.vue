<template>
	<Avatar :index="user.avatarSelected" :large="large" :whoAmI="!user.name"
		v-tooltip.bottom="{content:tooltip, offset:3}" :preserved="user.preserved"
		style="margin: 2px;" class="animated flipInY" :align="align"
	/>
</template>

<script>
import Avatar from '../Avatar'

export default {
	components: { Avatar },
	props: ['user', 'large', 'align'],
	computed: {
		tooltip() { return this.user.name ? `${this.user.name} (Lv. ${Math.floor(this.user.exp / 100)})` : '不知名的訪客' },
	}
}
</script>

<style scoped>
.avatar {
  display: inline-block;
  border: none;
}
</style>