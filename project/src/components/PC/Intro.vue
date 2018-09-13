<template>
	<div class="intro">
    <div class="welcome MobileFont animated flipInX">
      Welcome to our show !!
    </div>
		<img src="static/us.png" class="img animated flipInY">
    
    <Arrow v-if="showIceArrow" class="ice-arrow"/>
    <div class="ice-intro animated flipInX">
      <h2>Ice</h2>
      <ul>
        <li>負責音樂、動作、解謎、RPG，以及其他所有的操作。</li>
        <li>3D暈，許多遊戲不能玩 (´;ω;`)</li>
        <li class="yellow">出門都穿小裙子(Lolita fashoion)</li>
        <li><s>天氣熱會融化，天氣冷會結冰</s></li>
        <li>大家快來跟我聊天 (ﾟ3ﾟ)～♪</li>
      </ul>
    </div>

    <Arrow v-if="showXpArrow" class="xp-arrow"/>
    <div class="xp-intro animated flipInX">
      <h2>祥平君</h2>
      <ul>
        <li>除了3D遊戲跟射擊遊戲以外<br/>通通都不會玩...</li>
        <li>負責出一張嘴！</li>
        <li class="yellow">査攻略專員</li>
        <li>時不時會跑去 "修理" 實況系統</li>
        <li><s>會偷偷地睡著</s></li>
      </ul>
    </div>
    
    <div class="dismiss-container animated fadeIn">
      <div class="dismiss MobileFont animated infinite pulse">
        &gt;&gt; Click to continue &lt;&lt;
      </div>
    </div>
	</div>
</template>

<script>
import Arrow from './Arrow'

export default {
  components: { Arrow },
  data() { return { showXpArrow: false, showIceArrow: false } },
  mounted() {
    document.body.style.cursor = 'pointer'
    setTimeout(() => this.showIceArrow = true, 800)
    setTimeout(() => this.showXpArrow = true, 1200)
  },
  beforeDestroy() {
    document.body.style.cursor = 'default'
  }
}
</script>

<style scoped>
.intro {
  text-align: center;
}
.welcome {
  font-size: 60px;
  font-weight: bold;
}
.img {
  animation-delay: 0.4s;
}
.dismiss-container {
  animation-delay: 1s;
}
.dismiss {
  animation-duration: 3s;
  color: #99befd !important;
  text-shadow: 0px 2px #5b6ee1 !important;
  font-size: 20px;
  font-weight: bold;
}
.xp-intro,
.ice-intro {
  text-align: left;
  position: fixed;
  z-index: 99999;
}
.xp-intro ul,
.ice-intro ul {
  padding: 0px 0px;
  margin: 10px 0px;
  width: 250px;
}
.xp-intro,
.xp-intro *,
.ice-intro,
.ice-intro * {
  line-height: 23px;
  font-family: "Meiryo UI", system-ui;
  text-shadow: 0px 2px #705749, 2px 2px #705749, 0px 3px #705749,
    3px 3px #705749, 0px -1px #705749, -1px -1px #705749;
}
.ice-intro {
  top: calc(50% - 160px);
  left: calc(50% - 450px);
  animation-delay: 0.8s;
}
.ice-arrow {
  top: calc(50% - 40px);
  left: calc(50% - 340px);
  transform: rotate(310deg) scaleY(-1);
}
.xp-intro {
  top: calc(50% - 20px);
  left: calc(50% + 270px);
  animation-delay: 1.2s;
}
.xp-arrow {
  top: calc(50% - 170px);
  left: calc(50% + 200px);
  transform: rotate(150deg) scaleY(-1);
}
h2 {
  margin: 0px;
}
</style>