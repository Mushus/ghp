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
  overflow: hidden;
}
</style>

<script lang="ts">
import D3 from '@/assets/d3.ts'
/*import { Component, Vue } from 'nuxt-property-decorator';*/

export default {
  data() {
    return {
      threeJSTest: null,
    };
  },
  mounted() {
    this.threeJSTest = new D3(this.$refs.top);
    this.threeJSTest.render();
    this.threeJSTest.updateSize();
  },
  created() {
    window.addEventListener('resize', this.updateSize, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize, false);
  },
  methods: {
    updateSize() {
      this.threeJSTest.updateSize();
    }
  }
}

</script>
