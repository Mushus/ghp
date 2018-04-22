import * as React from "react";

interface CloudData {
  y: number;
  width: number;
  height: number;
  duration: number;
  begin: number;
}

export default class Clouds extends React.Component<any, any> {

  elem: SVGSVGElement|null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      clouds: [],
    };
  }

  generateItems(height: number): Array<CloudData> {
    const clouds: Array<CloudData> = [];
    for (let i: number = 0; i < 30; i++) {
      const cloudHeight = Math.random() * 100 + 100;
      const duration: number = Math.random() * 30000 + 10000;
      clouds.push({
        y: Math.random() * Math.random() * (height - cloudHeight / 2),
        width: Math.random() * 150 + 100,
        height: cloudHeight,
        duration,
        begin: duration * Math.random(),
      });
    }
    return clouds;
  }

  updateDimensions() {
    if (this.elem == null) return;
    const elem = this.elem!;
    const height = elem.clientHeight;
    const clouds = this.state.clouds.length > 0 ? this.state.clouds : this.generateItems(height);
    const state = Object.assign(this.state, {
      width: elem.clientWidth,
      height: elem.clientHeight,
      clouds: clouds,
    });
    this.setState(state);
  }
q
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <svg className="header--cloud" preserveAspectRatio="none" ref={e => {this.elem = e}}>
        { this.state.clouds.map( v => (
          <line
            y1={v.y}
            y2={v.y}
            x1="100"
            x2="100"
            stroke="#fff"
            stroke-linecap="round"
            style={ ({
              strokeWidth: (v.height / 2) + 'px',
              vectorEffect: 'non-scaling-stroke'
            })}>
            <animate
              begin={`-${v.begin | 0}ms`}
              attributeName="x1"
              from={-v.width - v.height / 2}
              to={this.state.width + v.height / 2}
              dur={`${v.duration | 0}ms`}
              repeatCount="indefinite" />
            <animate
              begin={`-${v.begin | 0}ms`}
              attributeName="x2"
              from={-v.height / 2}
              to={this.state.width + v.width + v.height / 2}
              dur={`${v.duration | 0}ms`}
              repeatCount="indefinite" />
          </line>
        ) ) }
      </svg>
    );
  }
}
