<template>
  <div>{{chatLines}}</div>
</template>

<script>
import ComicBubble from './ComicBubble'
import { mapGetters, mapActions } from 'vuex'

export default {
	components: { ComicBubble },
	computed: { ...mapGetters(['chatLines']) },
	watch: {
		chatLines(val, oldVal) {
			console.log(val, oldVal)
		}
	}
}

</script>