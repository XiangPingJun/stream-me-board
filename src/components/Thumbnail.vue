<template>
	<div>
		<slot>
	</div>
</template>

<style scoped>
.underline {
  padding-bottom: 3px;
  border-bottom: 3px solid #dbccb6;
}
.underline > span {
  padding-bottom: 6px;
  border-bottom: 3px solid #705749;
}
.underline-dot {
  width: 3px;
  display: inline-block;
}
</style>