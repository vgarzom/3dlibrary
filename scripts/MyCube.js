class MyCube {
    constructor(scene) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({color: 0x006699});
        this.cube = new THREE.Mesh(geometry, material);

        scene.add(this.cube);
    }

    animate() {
        this.cube.rotation.y += 0.01;
        this.cube.rotation.x += 0.001;
    }
}