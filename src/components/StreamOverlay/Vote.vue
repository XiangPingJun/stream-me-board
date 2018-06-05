<template>
  <div class="container">
		<div>
			<div class="title animated flipInX" v-if="voteStatTime"><i class="fas fa-dice"/> 投票啦!<PieChart :rate="timerRate" style="margin:0 0.1em"/></div>
			<div class="option-container">
				<div v-for="(roster, i) in voteRoster" class="option" :key="i">
					<div class="code animated flipInY">{{roster.option}}</div>
					<div class="count animated flipInX">({{fliper[i]}}票)</div>
					<div class="arrow animated flipInY" v-if="roster.users.length"><i class="fas fa-arrow-up"/></div>
					<div style="text-align:center">
						<Avatar v-for="(user, i) in roster.users" :index="user.avatarSelected" :large="true" class="animated flipInY" :key="i"/>
					</div>
				</div>
			</div>			
		</div>
  </div>
</template>

<script>
import Avatar from '../Avatar'
import PieChart from '../PieChart'
import { VOTE_TIMEOUT } from '../../common'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
	data() { return { fliper: [], flipInterval: null, timeout: null, timerRate: 0 } },
	components: { Avatar, PieChart },
	mounted() {
		this.flipInterval = setInterval(() => {
			this.voteRoster.forEach((roster, i) => {
				if (undefined == this.fliper[i])
					this.$set(this.fliper, i, 0)
				if (this.fliper[i] < roster.total)
					this.$set(this.fliper, i, this.fliper[i] + Math.ceil((roster.total - this.fliper[i]) / 5))
				if (this.fliper[i] > roster.total)
					this.$set(this.fliper, i, roster.total)
			})
			this.timerRate = 1 - ((new Date().getTime() - this.voteStatTime) / VOTE_TIMEOUT)
		}, 100)
	},
	beforeDestroy() { clearInterval(this.flipInterval) },
	computed: { ...mapState(['voteRoster']), ...mapGetters(['voteStatTime']) },
}
</script>

<style scoped>
.container {
  top: 0px;
  left: 0px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  color: #f8ecd5;
  text-shadow: 0px 3px #705749, 3px 3px #86674d;
}
.title {
  font-size: 5em;
  margin-top: 70px;
}
.option {
  max-width: 192px;
  margin: 0 25px;
}
.code {
  font-size: 20em;
  font-family: "VT323", monospace;
  margin: -30px 0px -40px 0px;
  text-align: center;
}
.count,
.arrow {
  font-size: 2em;
  text-shadow: 0px 2px #705749, 2px 2px #86674d;
  text-align: center;
  font-weight: bold;
}
.arrow {
  margin: 15px;
}
.option-container {
  display: flex;
  justify-content: center;
}
</style>