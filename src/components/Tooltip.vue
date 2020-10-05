<template>
  <span ref="tooltip" class="tooltiptext">
    {{ dat.text }}
  </span>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Tooltip",
  props: ["dat"],
  mounted() {
    this.$refs.tooltip.style.left = `${this.dat.left - 20}px`;
    this.$refs.tooltip.style.top = `${this.dat.top + 10}px`;
  },
});
</script>

<style lang="scss" scoped></style>
