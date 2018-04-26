<template>
  <header>
    <nuxt-link to="/">
      <h1 class="title">Wynd</h1>
    </nuxt-link>
    <p class="description">Experimental Contents</p>
    <no-ssr>
      <cloud-background />
    </no-ssr>
    <slot>
    </slot>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator"
import CloudBackground from "./CloudBackground.vue"

@Component({
  components: {
    CloudBackground
  }
})
export default class extends Vue {}
</script>

<style scoped>
header {
  position: relative;
  padding: 30px;
  height: 300px;
  max-height: calc(100vw * 5 / 8);
  .title {
    margin: 0;
  }
  .description {
    margin: 0;
  }
  *:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
