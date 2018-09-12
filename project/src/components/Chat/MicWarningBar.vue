<template>
  <div class="mic-warning-bar">
		<div v-if="micOffAlert">=====麥克風是不是沒開？=====</div>
		<div v-if="errMsg">{{errMsg}}</div>
	</div>
</template>

<script>
export default {
	data() {
		return { micOffAlert: false, errMsg: null, meter: null }
	},
	created() {
		window.AudioContext = window.AudioContext || window.webkitAudioContext
		const audioContext = new AudioContext()
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		navigator.getUserMedia({
			"audio": {
				"mandatory": {
					"googEchoCancellation": "false",
					"googAutoGainControl": "false",
					"googNoiseSuppression": "false",
					"googHighpassFilter": "false"
				},
				"optional": []
			},
		}, stream => {
			const mediaStreamSource = audioContext.createMediaStreamSource(stream);
			this.meter = createAudioMeter(audioContext);
			mediaStreamSource.connect(this.meter);
		}, () => this.errMsg = 'Mic stream generation failed.')
	},
	mounted() {
		let micOnFrom = new Date().getTime()
		setInterval(() => {
			if (!this.meter)
				return
			if (this.meter.volume > 0.001)
				micOnFrom = new Date().getTime()
			this.micOffAlert = new Date().getTime() - micOnFrom > 60000
		}, 1000)
	}
}
</script>

<style>
.mic-warning-bar {
  background-color: gray;
  font-size: 30px;
  color: #e57373;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
