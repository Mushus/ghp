import * as React from "react";

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

export default class Clouds extends React.Component<any, any> {

  elem: SVGSVGElement|null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      clouds: this.generateItems(),
    };
  }

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

  render() {
    return (
      <svg
        className="header--cloud"
        preserveAspectRatio="none"
        viewBox="0 0 1 1"
        ref={e => {this.elem = e}}>
        { this.state.clouds.map( v => (
          <rect
            x={v.x.to}
            y={v.y}
            width={v.width}
            height={v.height}
            rx={v.radius}
            ry={v.radius}
            fill={`#${(v.color.r | 0).toString(16)}${(v.color.g | 0).toString(16)}${(v.color.b | 0).toString(16)}`}>
            <animate
              begin={`-${v.x.begin}ms`}
              attributeName="x"
              from={v.x.from}
              to={v.x.to}
              dur={`${v.x.duration}ms`}
              repeatCount="indefinite" />
          </rect>
        ) ) }
      </svg>
    );
  }
}
