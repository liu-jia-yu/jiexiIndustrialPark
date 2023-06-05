<template>
  <div>
    <div class="full-screen-box">
      <Bodycontent />
    </div>
  </div>

</template>

<script setup>
  import Bodycontent from '../components/bodycontent.vue'
</script>

<style lang="scss" scoped>
  .full-screen-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>