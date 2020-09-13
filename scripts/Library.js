class Library {
  size = {
    width: 500,
    height: 500,
  };
  children = [];
  showGrid = true;
  showFog = true;
  backgroundColor = 0x006699;
  container = document.getElementById('renderer-container');

  constructor() {
    this.initScene();
    this.populateScene();
    this.animate();
  }

  initScene() {
    console.log('Scene is starting');
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    this.camera.position.set(112, 100, 600);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.backgroundColor);

    if (this.showFog) {
      this.scene.fog = new THREE.Fog(this.backgroundColor, 700, 3000);
    }

    this.scene.add(this.createGround());
    if (this.showGrid) {
      this.scene.add(this.createGrid());
    }
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);
  }

  createGround() {
    const ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10000, 10000),
      new THREE.MeshPhongMaterial({ color: this.backgroundColor, depthWrite: false })
    );
    //ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    return ground;
  }

  createGrid() {
    const grid = new THREE.GridHelper(5000, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    return grid;
  }

  populateScene() {
    this.scene.add(new THREE.AmbientLight(0xffffff));
    const directional = new THREE.DirectionalLight(0x707070);
    directional.position.set(0, 10, 30);
    this.scene.add(directional);
    this.children.push(new MyCube(this.scene));
  }

  animate() {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.children.map((c) => c.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
