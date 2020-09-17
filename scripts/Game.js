class Game {
  center = new THREE.Vector3(0, 60, -100);
  orbit = {
    angle: 57,
    ratio: 812,
    speed: 0.005,
  };

  status = 'starting';
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
  //loaderObj = new OBJLoader();
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
    this.camera.position.set(-380, 50, -100);
    this.camera.lookAt(this.center);
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
    window.addEventListener('mousedown', () => {
      console.log('click now');
      this.nextStatus(true);
    });
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

  createControls() {
    this.controls = new THREE.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.target.set(0, 60, -100);
    this.controls.enableZoom = false;
    //this.controls.
    //this.camera.lookAt(new THREE.Vector3(0, 60, -100));
    this.controls.update();
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
    const library = new Library(this.scene, this.loader);
    this.children.push(library);

    //this.createControls(library);
  }

  animate(time) {
    requestAnimationFrame((t) => {
      this.animate(t);
    });
    //console.log('updating tween');
    TWEEN.update(time);
    if (this.status === 'orbiting') {
      this.orbit.angle += this.orbit.speed;
      var position = new THREE.Vector3().copy(this.camera.position);
      position.x = this.orbit.ratio * Math.cos(this.orbit.angle);
      position.z = this.orbit.ratio * Math.sin(this.orbit.angle);
      this.camera.position.set(position.x, position.y, position.z);
      this.camera.lookAt(this.center);
    }
    //this.children.map((c) => c.animate());
    this.renderer.render(this.scene, this.camera);
  }

  nextStatus(fromClick = false) {
    switch (this.status) {
      case 'starting':
        if (!fromClick) return;
        this.status = 'start_orbiting';
        this.initOrbitCam();
        break;
      case 'start_orbiting':
        if (fromClick) return;
        this.status = 'orbiting';
        this.initOrbitCam();
        break;
      case 'orbiting':
        if (!fromClick) return;
        this.status = 'start_looking';
        this.startLooking();
        break;
      default:
        break;
    }
  }

  initOrbitCam() {
    console.log('init orbit');
    var position = new THREE.Vector3().copy(this.camera.position);

    var tween = new TWEEN.Tween(position)
      .to(
        new THREE.Vector3(
          this.orbit.ratio * Math.cos(this.orbit.angle),
          542,
          this.orbit.ratio * Math.sin(this.orbit.angle)
        ),
        5000
      )
      .easing(TWEEN.Easing.Back.InOut)
      .onUpdate(() => {
        this.camera.position.set(position.x, position.y, position.z);
        this.camera.lookAt(this.center);
      })
      .onComplete(() => {
        //this.createControls();
        this.nextStatus();
      })
      .start();
  }

  startLooking() {
    console.log('init orbit');
    var position = new THREE.Vector3().copy(this.camera.position);

    var tween = new TWEEN.Tween(position)
      .to(
        new THREE.Vector3(
          0,60,0
        ),
        5000
      )
      .easing(TWEEN.Easing.Back.InOut)
      .onUpdate(() => {
        this.camera.position.set(position.x, position.y, position.z);
        this.camera.lookAt(this.center);
      })
      .onComplete(() => {
        this.createControls();
        this.nextStatus();
      })
      .start();
  }
}
