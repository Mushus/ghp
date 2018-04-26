<template>
  <div ref="top" class="root">
  </div>
</template>

<style scoped>
.root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

}
</style>

<script lang="ts">
import D3 from '@/assets/d3.ts'
/*import { Component, Vue } from 'nuxt-property-decorator';*/

export default {
  mounted() {
    const threeJSTest = new D3(this.$refs.top);
    threeJSTest.render();
  }
}

</script>
