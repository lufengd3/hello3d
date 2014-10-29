var render = null
  , scene = null
  , camera = null
  , light = null
  , cube = null
  , animating = false;

function addGeometry() {
    // 创建带纹理的立方体,添加到场景中
    var mapUrl = '../img/star.png';
    var map = THREE.ImageUtils.loadTexture(mapUrl);

    var material = new THREE.MeshPhongMaterial({map: map});
    // var material = new THREE.MeshBasicMaterial();
    var geometry = new THREE.BoxGeometry(.5, .5, .5);
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(-1.5, -.6, .27);
    cube.rotation.y = .6;
    cube.rotation.z = .8;
    scene.add(cube);

    // var coordinate = [
    //     {.5, .5, .5},
    //     {-.5, .5, .5},
    //     {-.5, -.5, .5},
    //     {-.5, -.5, -.5},
    //     {.5, -.5, .5},
    //     {.5, .5, -.5},
    //     {.5, -.5, -.5},
    //     {-.5, .5, -.5}
    // ];

    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
    var materialCenter = new THREE.MeshBasicMaterial( {color: 0xbb4400, map: map} );
    var sphere1 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere1.position.set(.5, .5, .5);
    scene.add(sphere1);

    var sphere2 = new THREE.Mesh(new THREE.SphereGeometry(.061, 40, 50), material);
    sphere2.position.set(-.5, .5, .5);
    scene.add(sphere2);

    var sphere3 = new THREE.Mesh(new THREE.SphereGeometry(.061, 40, 50), material);
    sphere3.position.set(.5, -.5, .5);
    scene.add(sphere3);

    var sphere4 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere4.position.set(.5, .5, -.5);
    scene.add(sphere4);

    var sphere5 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere5.position.set(-.5, -.5, .5);
    scene.add(sphere5);

    var sphere6 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere6.position.set(-.5, .5, -.5);
    scene.add(sphere6);

    var sphere7 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere7.position.set(.5, -.5, -.5);
    scene.add(sphere7);

    var sphere8 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
    sphere8.position.set(-.5, -.5, -.5);
    scene.add(sphere8);

    var sphere8 = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), materialCenter);
    sphere8.position.set(0, 0, 0);
    scene.add(sphere8);

    // add line
    var p1 = new THREE.Vector3(.5, .5, .5);
    var p2 = new THREE.Vector3(-.5, .5, .5);
    var p3 = new THREE.Vector3(.5, -.5, .5);
    var p4 = new THREE.Vector3(.5, .5, -.5);
    var p5 = new THREE.Vector3(-.5, -.5, .5);
    var p6 = new THREE.Vector3(.5, -.5, -.5);
    var p7 = new THREE.Vector3(-.5, .5, -.5);
    var p8 = new THREE.Vector3(-.5, -.5, -.5);

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({linewidth: 3});
    geometry.vertices.push(p1, p2, p3, p5);
    geometry.vertices.push(p1, p4, p2, p7);
    geometry.vertices.push(p7, p4, p6, p8);
    geometry.vertices.push(p1, p3, p2, p5);
    geometry.vertices.push(p5, p8, p6, p3);
    geometry.vertices.push(p4, p6, p7, p8);
    
    var line1 = new THREE.Line(geometry, material, THREE.LinePieces);
    scene.add(line1);

    var geometry = new THREE.Geometry();
    var material2 = new THREE.LineDashedMaterial({fog: true, color: 0xff2233, dashSize: 5});
    geometry.vertices.push(p1, p8, p3, p7);
    geometry.vertices.push(p4, p5, p3, p6);

    var line2 = new THREE.Line(geometry, material2, THREE.LinePieces);
    scene.add(line2);
    // geometry.colors.push(color);

    // for (var i = 0.1; i > -2; i -= 0.2) {
    //     var line = new THREE.Line(geometry, material, THREE.LinePieces);
    //     line.position.y = i;
    //     scene.add(line);

    //     var line = new THREE.Line(geometry, material, THREE.LinePieces);
    //     line.position.x = -i;
    //     line.rotation.z = Math.PI / 2;
    //     scene.add(line);
    // }
}

function init() {
    var container = document.getElementById("container");
    // screen size
    var WIDTH = container.offsetWidth;
    var HEIGHT = container.offsetHeight;
    var ASPECT = WIDTH / HEIGHT;

    // 创建渲染器 
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    initCamera(ASPECT);
    initScene();
    initLight();

    scene.add(camera);
    scene.add(light);
    addGeometry();

    addMouseHandler();
    run();
}

function initCamera(ASPECT) {
    // camera attributes
    var VIEW_ANGLE = 45;
    var NEAR = 1;
    var FAR = 4000;

    // 创建相机
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 0, 5);
}

function initScene() {
    scene = new THREE.Scene();
}

function initLight() {
    // 创建光源
    light = new THREE.DirectionalLight(0xeeeeff, 1.5);
    light.position.set(0.3, 0.2, 1);
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
        camera.position.y -= .002;
        // camera.position.x += .01;
    }

    requestAnimationFrame(run);
}

document.onkeydown=function(e){ 
    var e = event.srcElement; 
    if(event.keyCode == 40)
        camera.position.y += .1;

    if(event.keyCode == 38)
        camera.position.y -= .1;

    if(event.keyCode == 39) 
        camera.position.x -= .1;

    if(event.keyCode == 37)
        camera.position.x += .1;

    if(event.keyCode==68)
        camera.position.z =camera.position.z -.1;
    renderer.render(scene, camera);
} 

document.onmousewheel = function(e) {
    if (e.wheelDelta == 120)
        camera.position.z -= .1;
    else if (e.wheelDelta == -120) 
        camera.position.z += .1;
    else  ;

    renderer.reder(scene, camera);

}
