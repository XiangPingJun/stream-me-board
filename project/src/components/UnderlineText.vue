<template>
	<div class="container">
		<div class="underline"><div><slot></slot></div></div>
		<div class="underline-dot"></div>
	</div>
</template>

<style scoped>
.container {
  display: flex;
  margin-bottom: 3px;
}
.underline {
  padding-bottom: 0px;
  border-bottom: 3px solid #705749;
}
.underline > div {
  line-height: 100%;
  padding-bottom: 4px;
  border-bottom: 3px solid #dbccb6;
}
.underline-dot {
  align-self: flex-end;
  width: 4px;
  height: 4px;
  margin-left: 4px;
  margin-bottom: 6px;
  box-shadow: 0px 3px #dbccb6, 0px 6px #705749;
  box-sizing: border-box;
}
</style>