class MyCube {
    constructor(scene) {
        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshPhongMaterial({color: 0x006600});
        this.cube = new THREE.Mesh(geometry, material);

        scene.add(this.cube);
    }

    animate() {
        this.cube.rotation.y += 0.01;
    }
}