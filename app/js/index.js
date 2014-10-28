var render = null
  , scene = null
  , camera = null
  , cube = null
  , sphere = null
  , sphere1 = null
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

    // 创建带纹理的立方体,添加到场景中
    var mapUrl = '../img/star.png';
    var map = THREE.ImageUtils.loadTexture(mapUrl);

    var material = new THREE.MeshPhongMaterial({map: map});
    // var material = new THREE.MeshBasicMaterial();
    var geometry = new THREE.BoxGeometry(.5, .5, .5);
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var geometry = new THREE.SphereGeometry(.1, 8, 8);
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
    sphere1 = new THREE.Mesh(geometry, material);
    sphere1.position.x = .27;
    sphere1.position.y = .27;
    sphere1.position.z = .27;
    scene.add(sphere1);

    sphere = new THREE.Mesh(new THREE.SphereGeometry(.1, 32, 32), material);
    sphere.position.x = -.27;
    sphere.position.y = .27;
    sphere.position.z = .27;
    scene.add(sphere);
    
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
        sphere.rotation.y -= 0.01;
    }

    requestAnimationFrame(run);
}
