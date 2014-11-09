$(document).ready(function() {
    var container = null
    , renderer = null
    , scene = null
    , camera = null
    , light = null
    , cube = null
    , controls = null
    , animating = false
    , support = null
    , mapUrl = '../img/star.png';
    // , map = THREE.ImageUtils.loadTexture(mapUrl);

    var coordinate = {
        'simpleBox': {
            'vertex': [
                {'x': .5, 'y': .5, 'z': .5},
                {'x': -.5, 'y': .5, 'z': .5},
                {'x': .5, 'y': -.5, 'z': .5},
                {'x': .5, 'y': .5, 'z': -.5},
                {'x': -.5, 'y': -.5, 'z': .5},
                {'x': .5, 'y': -.5, 'z': -.5},
                {'x': -.5, 'y': .5, 'z': -.5},
                {'x': -.5, 'y': -.5, 'z': -.5},
            ],
            'size': {'r': .06, 'w': 50, 'h': 50}
        },
        'fccBox': {
            'vertex': [
                {'x': 0, 'y': 0, 'z': .5},
                {'x': .5, 'y': 0, 'z': 0},
                {'x': 0, 'y': 0, 'z': -.5},
                {'x': 0, 'y': .5, 'z': 0},
                {'x': -.5, 'y': 0, 'z': 0},
                {'x': 0, 'y': -.5, 'z': 0},
            ],
            'size': {'r': .06, 'w': 50, 'h': 50}
        },
        'hcpBox': {
            'vertex': [
                {'x': 0, 'y': 0, 'z': 0},
                {'x': .3464, 'y': 0, 'z': -.2},
                {'x': -.3464, 'y': 0, 'z': -.2},
                {'x': 0, 'y': 0, 'z': -.4},
                {'x': -.3464, 'y': 0, 'z': .2},
                {'x': .3464, 'y': 0, 'z': .2},
                {'x': 0, 'y': 0, 'z': .4},
                {'x': .2, 'y': .3464, 'z': 0},
                {'x': -.1464, 'y': .3464, 'z': .2},
                {'x': -.1464, 'y': .3464, 'z': -.2},
            ],
            'size': {'r': .2, 'w': 50, 'h': 50}
        },
        'csclBox': {
            'vertex': [
                {'x': 0, 'y': 0, 'z': 0},
                {'x': 1, 'y': 0, 'z': 0},
                {'x': 0, 'y': -1, 'z': 0},
                {'x': 1, 'y': -1, 'z': 0},
                {'x': 0, 'y': 0, 'z': 1},
                {'x': 1, 'y': 0, 'z': 1},
                {'x': 0, 'y': -1, 'z': 1},
                {'x': 1, 'y': -1, 'z': 1},
            ],
            'size': {'r': .08, 'w': 50, 'h': 50}
        },
        'diamondBox': {
            'vertex': [
                {'x': 0, 'y': 0, 'z': .5},
                {'x': .5, 'y': 0, 'z': 0},
                {'x': 0, 'y': 0, 'z': -.5},
                {'x': 0, 'y': .5, 'z': 0},
                {'x': -.5, 'y': 0, 'z': 0},
                {'x': 0, 'y': -.5, 'z': 0},
                {'x': .25, 'y': -.25, 'z': .25},
                {'x': -.25, 'y': -.25, 'z': -.25},
                {'x': .25, 'y': .25, 'z': -.25},
                {'x': -.25, 'y': .25, 'z': .25},
            ],
            'line': [
                {'x': .25, 'y': -.25, 'z': .25},
                {'x': 0, 'y': 0, 'z': .5},
                {'x': 0, 'y': -.5, 'z': 0},
                {'x': .5, 'y': 0, 'z': 0},
                {'x': .5, 'y': -.5, 'z': .5},
                {'x': -.25, 'y': -.25, 'z': -.25},
                {'x': -.5, 'y': -.5, 'z': -.5},
                {'x': -.5, 'y': 0, 'z': 0},
                {'x': 0, 'y': 0, 'z': -.5},
                {'x': -.25, 'y': .25, 'z': .25},
                {'x': -.5, 'y': .5, 'z': .5},
                {'x': 0, 'y': .5, 'z': 0},
                {'x': .25, 'y': .25, 'z': -.25},
                {'x': .5, 'y': .5, 'z': -.5},
            ],
            'size': {'r': .06, 'w': 50, 'h': 50}
        },
    };

    detect();

    // $('.index li').click(function() {
    //     $('.main').moveTo($(this).attr('id'));
    // });

    $('.main').onepage_scroll({
        afterMove: function(index) {
            // if (!support) {
            //     alert('请使用Chrome浏览器访问本站.') 
            // }
            clear();
            switch(index) {
                case 2:
                    init('simpleBox');
                    break;
                case 3: 
                    init('fccBox');
                    break;
                case 4: 
                    init('bccBox');
                    break;
                case 5: 
                    init('csclBox');
                    break;
                case 6: 
                    init('diamondBox');
                    break;
                case 7: 
                    init('hcpBox');
                    break;
                case 8: 
                    init('cubeBox');
                    break;
                default:
                    break;
            }
        }
    });

    $('.scrollHint').click(function() {
        $('.main').moveTo(2);
    });

    function detect() {
        var support = !navigator.userAgent.match(/Trident.*rv\:11\./) && ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
        // if (!window.WebGLRenderingContext) {
        if (!support) {
            alert('Opps...您的浏览器不支持WebGL，推荐使用最新版本的Chrome或Firefox浏览器访问本站');
        }
    }

    function clear() {
        if (container != null) {
            container.empty()
        }

        renderer = null
        , scene = null
        , camera = null
        , light = null
        , cube = null
        , controls = null
        , animating = false;
    }

    function init(box) {
        container = $("." + box);
        // screen size
        var WIDTH = container.width();
        var HEIGHT = container.height();
        var ASPECT = WIDTH / HEIGHT;

        // 创建渲染器 
        renderer = new THREE.WebGLRenderer({antialias: true});
        // renderer = Detector.webgl ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer({antialias: true});
        renderer.setSize(WIDTH, HEIGHT);
        container.append(renderer.domElement);

        initCamera(ASPECT);
        initScene();
        initLight();

        scene.add(camera);
        scene.add(light);
        addGeometry(box);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
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
        if (renderer) {
            renderer.render(scene, camera);
            controls.update();

            requestAnimationFrame(run);
        }
    }

    function addGeometry(box) {
        // addCube();
        switch(box) {
            case 'simpleBox':
                simple();
                break;
            case 'fccBox':
                fcc();
                break;
            case 'bccBox':
                bcc();
                break;
            case 'csclBox':
                cscl();
                break;
            case 'diamondBox':
                diamond();
                break;
            case 'hcpBox':
                hcp();
                break;
            case 'cubeBox':
                addCube();
                break;
            default:
                break;
        }
    }


    function simple() {
        // 创建带纹理的立方体,添加到场景中
        var mapUrl = '../img/star.png';
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
        var size = coordinate.simpleBox.size;

        $.each(coordinate.simpleBox.vertex, function(key, val) {
            window['sphere' + (key + 1)] = new THREE.Mesh(new THREE.SphereGeometry(size.r, size.w, size.h), material);
            window['sphere' + (key + 1)].position.set(val.x, val.y, val.z);
            window['p' + (key + 1)] = new THREE.Vector3(val.x, val.y, val.z);   // add line
            scene.add(window['sphere' + (key + 1)]);
        });

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
    }

    // body centered cubic
    function bcc() {
        simple();

        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
        var geometry = new THREE.Geometry(); var material2 = new THREE.LineDashedMaterial( { color: 0xff2233, dashSize: 4, gapSize: 2 } ); 
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(.06, 50, 50), material);
        sphere.position.set(0, 0, 0);
        scene.add(sphere);

        geometry.vertices.push(p1, p8, p3, p7);
        geometry.vertices.push(p4, p5, p3, p6);
        geometry.vertices.push(p2, p6, p2, p5);

        var line2 = new THREE.Line(geometry, material2, THREE.LinePieces);
        scene.add(line2);
    }

    // face centered cubic
    function fcc() {
        simple();

        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
        var size = coordinate.fccBox.size;

        $.each(coordinate.fccBox.vertex, function(key, val) {
            window['sphere' + (key + 1)] = new THREE.Mesh(new THREE.SphereGeometry(size.r, size.w, size.h), material);
            window['sphere' + (key + 1)].position.set(val.x, val.y, val.z);
            scene.add(window['sphere' + (key + 1)]);
        });

        var geometry = new THREE.Geometry();
        var material = new THREE.LineDashedMaterial({fog: true, color: 0xff2233, dashSize: 5});

        geometry.vertices.push(p1, p5, p3, p2);
        geometry.vertices.push(p1, p7, p2, p4);
        geometry.vertices.push(p7, p6, p8, p4);
        geometry.vertices.push(p1, p6, p2, p8);
        geometry.vertices.push(p5, p6, p8, p3);
        geometry.vertices.push(p4, p3, p7, p5);

        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);
    }

    function cscl() {
        simple();
        addClmodel();
    }

    function diamond() {
        simple();
        addCmodel();
    }

    function hcp() {
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xbb4400, map: map} );
        var size = coordinate.hcpBox.size;

        $.each(coordinate.hcpBox.vertex, function(key, val) {
            if (key > 6) {
                material = new THREE.MeshBasicMaterial( {color: 0x4fe2e7, map: map} );
            }
            window['sphere' + (key + 1)] = new THREE.Mesh(new THREE.SphereGeometry(size.r, size.w, size.h), material);
            window['sphere' + (key + 1)].position.set(val.x, val.y, val.z);
            scene.add(window['sphere' + (key + 1)]);
        });
    }

    function addCube() {
        // 创建带纹理的立方体,添加到场景中
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshPhongMaterial({map: map});
        var geometry = new THREE.BoxGeometry(.5, .5, .5);
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(-1.5, -.6, .27);
        cube.rotation.y = .6;
        cube.rotation.z = .8;
        scene.add(cube);
    }

    function addCmodel() {
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: map} );
        var size = coordinate.diamondBox.size;

        $.each(coordinate.diamondBox.vertex, function(key, val) {
            if (key > 5) {
                material = new THREE.MeshBasicMaterial( {color: 0x4fe2e7, map: map} );
            //     size.r = .03;
            }
            window['sphere' + (key + 1)] = new THREE.Mesh(new THREE.SphereGeometry(size.r, size.w, size.h), material);
            window['sphere' + (key + 1)].position.set(val.x, val.y, val.z);
            scene.add(window['sphere' + (key + 1)]);
        });

        // add line
        $.each(coordinate.diamondBox.line, function(key, val) {
            window['p' + (key + 1)] = new THREE.Vector3(val.x, val.y, val.z);
        });

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({linewidth: 1, color: 0xff2233});
        geometry.vertices.push(p1, p2, p1, p3, p1, p4, p1, p5);
        geometry.vertices.push(p6, p7, p6, p8, p6, p9, p6, p3);
        geometry.vertices.push(p10, p11, p10, p12, p10, p8, p10, p2);
        geometry.vertices.push(p13, p14, p13, p12, p13, p9, p13, p4);
        // geometry.vertices.push(p5, p7, p6, p8);
        // geometry.vertices.push(p5, p1, p6, p2);
        // geometry.vertices.push(p8, p4, p7, p3);
        
        var line1 = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line1);
    }

    function addClmodel() {
        var map = THREE.ImageUtils.loadTexture(mapUrl);
        var material = new THREE.MeshBasicMaterial( {color: 0xff2233, map: map} );
        var size = coordinate.csclBox.size;

        $.each(coordinate.csclBox.vertex, function(key, val) {
            window['sphere' + (key + 1)] = new THREE.Mesh(new THREE.SphereGeometry(size.r, size.w, size.h), material);
            window['sphere' + (key + 1)].position.set(val.x, val.y, val.z);
            window['p' + (key + 1)] = new THREE.Vector3(val.x, val.y, val.z);   // add line
            scene.add(window['sphere' + (key + 1)]);
        });

        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({linewidth: 3, color: 0x4fe2e7});
        geometry.vertices.push(p1, p2, p2, p4);
        geometry.vertices.push(p1, p3, p3, p4);
        geometry.vertices.push(p5, p6, p7, p8);
        geometry.vertices.push(p5, p7, p6, p8);
        geometry.vertices.push(p5, p1, p6, p2);
        geometry.vertices.push(p8, p4, p7, p3);
        
        var line1 = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line1);
        
        var geometry = new THREE.Geometry(); 
        var material2 = new THREE.LineDashedMaterial( { color: 0xff2233, dashSize: 4, gapSize: 2 } ); 
        p0 = new THREE.Vector3(-.5, .5, -.5);
        geometry.vertices.push(p0, p8);

        var line2 = new THREE.Line(geometry, material2, THREE.LinePieces);
        scene.add(line2);
    }

});


// document.onkeydown=function(e){ 
//     var e = event.srcElement; 
//     if(event.keyCode == 40)
//         camera.position.y += .1;

//     if(event.keyCode == 38)
//         camera.position.y -= .1;

//     if(event.keyCode == 39) 
//         camera.position.x -= .1;

//     if(event.keyCode == 37)
//         camera.position.x += .1;

//     if(event.keyCode==68)
//         camera.position.z =camera.position.z -.1;
//     renderer.render(scene, camera);
// } 

// document.onmousewheel = function(e) {
//     if (e.wheelDelta == 120)
//         camera.position.z -= .1;
//     else if (e.wheelDelta == -120) 
//         camera.position.z += .1;
//     else  ;

//     renderer.render(scene, camera);

// }

