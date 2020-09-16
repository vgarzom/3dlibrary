class Library {
  player = {};
  constructor(scene, loader) {
    loader.load(
      `assets/models/Bookself/Bookself.fbx`,
      (model) => {
        model.name = 'Library';
        console.log('model', model);
        model.position.x = -135;
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
        this.player.object.position.z = -100;
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
