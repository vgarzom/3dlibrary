class Sofa {
  player = {};
  constructor(scene, loader) {
    loader.load(
      `assets/models/sofa.FBX`,
      (model) => {
        model.name = 'Sofa';
        console.log('sofa', model);
        model.position.x = 0;
        model.position.z = 0;

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
        scene.add(this.player.object);
        this.player.object.position.z = 100;

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
