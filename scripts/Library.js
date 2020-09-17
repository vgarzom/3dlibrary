class Library {
  player = {};
  constructor(scene, loader) {
    loader.load(
      `assets/models/library_circled.fbx`,
      (model) => {
        model.name = 'Library';
        model.scale.set(50,50,50);
        //model.position.x = -135;
       
        // const tLoader = new THREE.TextureLoader();
        /*
      tLoader.load(`assets/models/Bookself/Diffuse.png`, (texture) => {
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture;
          }
        });
      });
*/
        this.player.object = new THREE.Object3D();
        this.player.object.add(model);
        console.log("object", this.player.object);
        scene.add(this.player.object);
        this.player.object.position.set(-65, 0, -85);
        //this.animations.Idle = model.animations[0];
      },
      (p) => {
        console.log('progress', p);
      },
      (err) => {
        console.log('Error', err);
      }
    );
  }

  animate() {
    //this.player.object.rotation.y += 0.01;
  }
}
