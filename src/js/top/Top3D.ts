import * as THREE from "three/build/three.module";

export default class {
  private elem: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.Geometry;
  private material: THREE.Material;
  private cube: THREE.Mesh;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.createRenderer();
    this.createScene();
  }

  private createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.elem.offsetWidth, this.elem.offsetHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.elem!.appendChild(this.renderer.domElement);
  }

  private createScene() {
    // シーン (空間) を作成
    this.scene = new THREE.Scene();

    // 立方体のジオメトリーを作成
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    // 緑のマテリアルを作成
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
    this.cube = new THREE.Mesh(this.geometry, this.material);
    // メッシュをシーンに追加
    this.scene.add(this.cube);

    // カメラを作成
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.elem.offsetWidth / this.elem.offsetHeight,
      0.1,
      1000
    );
    // カメラ位置を設定
    this.camera.position.z = 2;
  }

  public render() {
    requestAnimationFrame(this.render.bind(this));

    // 立方体メッシュを自転
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // レンダリング
    this.renderer.render(this.scene, this.camera);
  }
}
