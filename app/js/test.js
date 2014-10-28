var render = null
  , scene = null
  , camera = null
  , cube = null
  , animating = false;

function init() {
    var container = document.getElementById("container");
    // screen size
    var WIDTH = container.offsetWidth;
    var HEIGHT = container.offsetHeight;

    // camera attributes
    var VIEW_ANGLE = 45;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 1;
    var FAR = 4000;

    // 创建渲染器 
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    // 创建场景
    scene = new THREE.Scene();

    // 创建相机
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    // 创建光源
    var light = new THREE.DirectionalLight(0xeeeeff, 1.5);
    light.position.set(0.3, 0.2, 1);
    scene.add(light);

    var material = new THREE.MeshNormalMaterial();
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, -10, 0)
    );
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeBoundingSphere();

    cube = new THREE.Mesh(geometry, material);
    cube.rotation.y = Math.PI / 6;
    cube.rotation.z = Math.PI / 6;
    scene.add(cube);
    
    addMouseHandler();
    run();
}

function addMouseHandler() {
    var dom = renderer.domElement;
    dom.addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp(e) {
    e.preventDefault();
    animating = !animating;
}

function run() {
    // 渲染
    renderer.render(scene, camera);
    if (animating) {
        cube.rotation.y -= 0.01;
    }

    requestAnimationFrame(run);
}
