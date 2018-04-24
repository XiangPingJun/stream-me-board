<template>
  <input />
</template>

<style scoped>
/*= input focus effects css
=========================== */
:focus {
  outline: none;
}

input[type="text"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}

.effect-8 {
  border: 1px solid #ccc;
  padding: 7px 14px 9px;
  transition: 0.4s;
}

.effect-8 ~ .focus-border:before,
.effect-8 ~ .focus-border:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3399ff;
  transition: 0.3s;
}
.effect-8 ~ .focus-border:after {
  top: auto;
  bottom: 0;
  left: auto;
  right: 0;
}
.effect-8 ~ .focus-border i:before,
.effect-8 ~ .focus-border i:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 0;
  background-color: #3399ff;
  transition: 0.4s;
}
.effect-8 ~ .focus-border i:after {
  left: auto;
  right: 0;
  top: auto;
  bottom: 0;
}
.effect-8:focus ~ .focus-border:before,
.effect-8:focus ~ .focus-border:after {
  width: 100%;
  transition: 0.3s;
}
.effect-8:focus ~ .focus-border i:before,
.effect-8:focus ~ .focus-border i:after {
  height: 100%;
  transition: 0.4s;
}
</style>