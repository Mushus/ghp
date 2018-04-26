<template>
  <div class="view" :style="{maxHeight: `${height}px`}">
    <svg :style="{
        width: `${width}px`,
        height: `${width}px`
      }"
      className="header--cloud"
      preserveAspectRatio="none"
      viewBox="0 0 1 1">
      <rect
        v-for="cloud in clouds"
        :x="cloud.x.to"
        :y="cloud.y"
        :width="cloud.width"
        :height="cloud.height"
        :rx="cloud.radius"
        :ry="cloud.radius"
        :fill="`#${(cloud.color.r | 0).toString(16)}${(cloud.color.g | 0).toString(16)}${(cloud.color.b | 0).toString(16)}`">
        <animate
          :begin="`-${cloud.x.begin}ms`"
          attributeName="x"
          :from="cloud.x.from"
          :to="cloud.x.to"
          :dur="`${cloud.x.duration}ms`"
          repeatCount="indefinite" />
      </rect>
    </svg>
  </div>
</template>

<style scoped>
.view {
  position: absolute;
  z-index: -1000;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>

<script lang="ts">
interface Color {
  r: number;
  g: number;
  b: number;
}

interface SVGAnimation {
  from: number;
  to: number;
  duration: number;
  begin: number;
}

interface CloudData {
  color: Color;
  x: SVGAnimation;
  y: number;
  z: number;
  width: number;
  height: number;
  radius: number;
}

export default {
  data() {
    return {
      width: 0,
      height: 0,
      clouds: this.generateItems(),
    }
  },
  created() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateSize, false);
  },
  methods: {
    updateSize() {
      this.width = document.documentElement.scrollWidth;
      this.height = document.documentElement.scrollHeight;
    },
    generateItems(): Array<CloudData> {
      const clouds: Array<CloudData> = [];
      for (let i: number = 0; i < 100; i++) {
        const cloudWidth = Math.random() * 0.2 + 0.1;
        let cloud: any;
        let drawHeight: number;
        do {
          const z = Math.random();
          cloud = {
            color: (z * 5 | 0) / 5,
            z: z * 2 + 0.4,
            y: Math.random() * Math.random(),
            width: cloudWidth,
            height: cloudWidth * (Math.random() * 0.3 + 0.3),
            speed: 0.00003,
          };
          drawHeight = cloud.height / cloud.z
        } while(cloud.y / cloud.z + drawHeight / 2 > 1);

        const drawWidth = cloud.width / cloud.z;
        // x:1 = z:1
        const duration = (cloud.z + cloud.width) / cloud.speed;
        clouds.push({
          x: {
            from: 0 - drawWidth,
            to: 1,
            duration: duration,
            begin: duration * Math.random(),
          },
          y: cloud.y / cloud.z - drawHeight / 2,
          z: cloud.z,
          width: drawWidth,
          height: drawHeight,
          color: {
            r: 162 * cloud.color + 255 * ( 1 - cloud.color ),
            g: 215 * cloud.color + 255 * ( 1 - cloud.color ),
            b: 221 * cloud.color + 255 * ( 1 - cloud.color )
          },
          radius: Math.min(drawWidth, drawHeight) / 2,
        });
      }

      return clouds.sort((a, b) => b.z - a.z);
    }
  }
}

</script>
