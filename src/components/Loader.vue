<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'AppLoader',
});
</script>

<template>
  <div class="loader">
    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200000;
  background-color: #ecfeff;
  span {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    transform: translate(-50%, -50%);
    margin-right: -50%;
    z-index: 1;
    width: 80px;
    height: 80px;
    border: 3px solid transparent;
    border-radius: 50%;
    border-bottom: 3px solid #bfbfff;
    border-top: 3px solid #bfbfff;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
