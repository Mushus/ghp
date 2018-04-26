<template>
  <div>
    <site-header>
      <no-ssr>
        <header3d />
      </no-ssr>
    </site-header>
    <site-main class="main">
      <nuxt-link to="/profile" class="panel-item color-darkgray size-large">
        <article class="item-content">
          <h2 class="panel-title">hoge</h2>
        </article>
      </nuxt-link>
      <nuxt-link to="/profile" class="panel-item">
        <div class="item-content">hoge</div>
      </nuxt-link>
    </site-main>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/css/variables.scss";

.main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($glid-min-size, 1fr));
  grid-gap: $glid-gap-size;
  padding: $glid-gap-size;
  min-width: $glid-min-size * 2 + $glid-gap-size * 3;
  font-size: $panel-font-size;

  /* mobile */
  @media screen and (max-width: $break-point) {
    grid-template-columns: repeat(auto-fill, minmax($m-glid-min-size, 1fr));
    grid-gap: $m-glid-gap-size;
    padding: $m-glid-gap-size;
    min-width: $m-glid-min-size * 2 + $m-glid-gap-size * 3;
    font-size: $m-panel-font-size;
  }

  .panel-item {
    background-color: #fff;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);

    /* 色 */
    &.color-darkgray {
      background-color: #444;
      color: #fff;
    }

    /* 大きさ */
    &.size-large {
      grid-row: span 2;
      grid-column: span 2;
    }

    /* サイズを正方形にする */
    position: relative;
    &:before {
      display: block;
      content: "";
      padding-top: 100%;
    }
    .item-content {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }

    .item-content {
      .panel-title {
        padding: 12px;
        font-size: 1.3em;
        font-weight: normal;
        margin: 0;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Header3d from '@/components/top/Header3d.vue';

@Component({
  components: {
    Header3d
  }
})
export default class extends Vue {
/*  head: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/92/three.min.js' }
    ]
  }*/
}
</script>
