class Game {
  container = document.getElementById('renderer-container');
  size = {
    width: this.container.clientWidth,
    height: this.container.clientHeight,
  };
  children = [];
  showGrid = true;
  showFog = true;
  backgroundColor = 0x006699;

  loader = new THREE.FBXLoader();
  updateTween = false;

  constructor() {
    this.initScene();
    this.populateScene();
    this.animate(0);
  }

  initScene() {
    console.log('Scene is starting');
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    this.camera.position.set(0, 100, -200);
    this.camera.lookAt(new THREE.Vector3(0, 60, -100));
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
      new THREE.MeshPhongMaterial({
        color: this.backgroundColor,
        depthWrite: false,
      })
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
    this.children.push(new Library(this.scene, this.loader));
    this.children.push(new Sofa(this.scene, this.loader));

    console.log('tween now');
    let start = this.camera.position;
    
    let curve = new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3(-200, 60, -100),
      new THREE.Vector3(0, 60, 0),
    ]);
    const lookAt = new THREE.Vector3(0, 60, -100);
    const points = curve.getPoints(150);
    let progress = { value: 0 };
    this.updateTween = true;
    const tween = new TWEEN.Tween(progress) // Create a new tween that modifies 'coords'.
      .to({ value: points.length - 1 }, 10000) // Move to (300, 200) in 1 second.
      //.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        const point = points[Math.round(progress.value)];
        this.camera.position.set(point.x, point.y, point.z);
        this.camera.lookAt(lookAt);
        console.log("progress", progress);
        if (progress.value === 1) {
          console.log("tween stopped");
          this.updateTween = false;
        }
      });

    tween.start(); // Start the tween immediately.
  }

  animate(time) {
    requestAnimationFrame((t) => {
      this.animate(t);
    });
    if (this.updateTween) {
      console.log("updating tween");
      TWEEN.update(time);
    }

    //this.children.map((c) => c.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
