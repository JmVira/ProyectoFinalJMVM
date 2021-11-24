import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { FontLoader } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports/unoptimized/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({ antialias: true });

//Texturas 
var texturaSuelo = new THREE.TextureLoader().load('texturas/textura1.jpg');
var texturaPared1 = new THREE.TextureLoader().load('texturas/textura2.jpg');

//Texto Cargar
const cargadorTexto = new FontLoader();

// Para Cargar modelos3d
let loader = new GLTFLoader();
let perro;
let gato;
let tren;
let faro;
let mesa;
let cuchillo;

document.body.onload = () => {
    main();
};

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, true);
};

//main
function main() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    camera.position.z = 0;
    camera.position.y = 15;
    camera.position.x = 0;

    /* Plano piso de la casa*/

    const suelo = drawPlane(100, 200, 4, 4, 0xffffff, true, texturaSuelo);
    suelo.position.x = 0;
    suelo.position.y = 0;
    suelo.position.z = -10;
    suelo.rotation.x = Math.PI / 2;
    scene.add(suelo);

    /* Plano techo de la casa*/

    const techo = drawPlane(100, 200, 4, 4, 0x000000, true);
    techo.position.x = 0;
    techo.position.y = 32;
    techo.position.z = -10;
    techo.rotation.x = Math.PI / 2;
    scene.add(techo);

    /* Pared izq */

    const paredIzq = drawCube(1, 65, 200, 0xffffff, false, texturaPared1);
    paredIzq.position.x = 50;
    paredIzq.position.y = 32;
    paredIzq.position.z = -10;
    scene.add(paredIzq);

    /* Pared Der */

    const paredDer = drawCube(1, 65, 200, 0xffffff, false, texturaPared1);
    paredDer.position.x = -50;
    paredDer.position.y = 32;
    paredDer.position.z = -10;
    scene.add(paredDer);

    /* Pared Frontal */

    const paredFront = drawCube(1, 65, 100, 0xffffff, false);
    paredFront.rotation.y = Math.PI / 2;
    paredFront.position.x = 0;
    paredFront.position.y = 32;
    paredFront.position.z = 90;
    scene.add(paredFront);

    /* Pared Trasera */

    const paredTras = drawCube(1, 65, 100, 0xffffff, false);
    paredTras.rotation.y = Math.PI / 2;
    paredTras.position.x = 0;
    paredTras.position.y = 32;
    paredTras.position.z = -110;
    scene.add(paredTras);


    /* Habitación 1 y 2 */

    const habitacion1 = drawCube(1, 65, 50, 0xffffff, false, texturaPared1);
    habitacion1.position.x = 0;
    habitacion1.position.y = 32;
    habitacion1.position.z = 65;
    scene.add(habitacion1);

    /* Habitación 3 y 4 */

    const habitacion2 = drawCube(1, 65, 50, 0xffffff, false, texturaPared1);
    habitacion2.position.x = 0;
    habitacion2.position.y = 32;
    habitacion2.position.z = -85;
    scene.add(habitacion2);


    /*  luces */

    /* Luz de Ambiente */
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    /* Luz Bombillo */
    const luzTecho = new THREE.SpotLight(0xffffff);
    luzTecho.position.set(0, 31, 0);
    luzTecho.distance = 80;
    luzTecho.angle = Math.PI / 3;
    luzTecho.penumbra = 0.5;
    luzTecho.castShadow = true;

    scene.add(luzTecho);

    /* Luz cuarto 1 */

    const luz1 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz1.position.set(42, 4, 80);
    scene.add(luz1);
    //
    const luz2 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz2.position.set(2, 4, 80);
    scene.add(luz2);

    const luzTecho1 = new THREE.PointLight(0xffffff, 1, 55);
    luzTecho1.position.set(21, 30, 50);
    scene.add(luzTecho1);


    // cuarto 2

    const luz3 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz3.position.set(-2, 4, 80);
    scene.add(luz3);

    const luz4 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz4.position.set(-42, 4, 80);
    scene.add(luz4);

    const luzTecho2 = new THREE.PointLight(0xffffff, 1, 55);
    luzTecho2.position.set(-21, 30, 50);
    scene.add(luzTecho2);

    //Cuarto3

    const luz5 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz5.position.set(-42, 4, -100);
    scene.add(luz5);

    const luz6 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz6.position.set(-2, 4, -100);
    scene.add(luz6);

    const luzTecho3 = new THREE.PointLight(0xffffff, 1, 55);
    luzTecho3.position.set(-21, 30, -80);
    scene.add(luzTecho3);

    // Cuarto 4

    const luz7 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz7.position.set(2, 4, -100);
    scene.add(luz7);

    const luz8 = new THREE.PointLight(0xffffff, 0.5, 55);
    luz8.position.set(-2, 4, -100);
    scene.add(luz8);



    const luz9 = new THREE.PointLight(0xffffff, 0.8, 55);
    luz9.position.set(42, 4, -100);
    scene.add(luz9);

    const luzTecho4 = new THREE.PointLight(0xffffff, 1, 55);
    luzTecho4.position.set(21, 30, -80);
    scene.add(luzTecho4);

    //LuzFinal
    const luzTechoFinal = new THREE.PointLight(0xffffff, 1.5, 80);
    luzTechoFinal.position.set(45, 30, 0);
    scene.add(luzTechoFinal);

    /* Funciones para cargar los modelos 3d */

    /* Modelo 1 */
    loader.load(
        `modelos/modelo1/scene.gltf`, //Intancia para cargar el modelo
        function(gltf) {
            perro = gltf.scene.children[0];
            perro.position.x = 30;
            perro.position.y = 1;
            perro.position.z = 80;
            perro.scale.set(1, 1, 1);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
    /* Modelo 2 */
    loader.load(
        `modelos/modelo2/scene.gltf`,
        function(gltf) {
            gato = gltf.scene.children[0];
            gato.position.x = -25;
            gato.position.y = 0;
            gato.position.z = 80;
            gato.rotation.z = Math.PI / 2;
            gato.scale.set(1, 1, 1);
            scene.add(gltf.scene);

        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
    /* Modelo 3 */
    loader.load(
        `modelos/modelo3/scene.gltf`,
        function(gltf) {
            faro = gltf.scene.children[0];
            faro.position.x = -40;
            faro.position.y = 0;
            faro.position.z = -98;
            faro.rotation.z = Math.PI / 1.5;
            faro.scale.set(0.7, 0.7, 0.7);
            scene.add(gltf.scene);

        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
    /* Modelo 4 */
    loader.load(
        `modelos/modelo4/scene.gltf`,
        function(gltf) {
            tren = gltf.scene.children[0];
            tren.position.x = 10;
            tren.position.y = 1;
            tren.position.z = -80;

            tren.receiveShadow = true;
            tren.scale.set(0.7, 0.7, 0.7);
            scene.add(gltf.scene);

        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
    /* Modelo 5 */
    loader.load(
        `modelos/modelo5/scene.gltf`,
        function(gltf) {
            mesa = gltf.scene.children[0];
            mesa.position.x = 45;
            mesa.position.y = 1;
            mesa.position.z = 0;

            mesa.receiveShadow = true;
            mesa.castShadow = true;
            mesa.scale.set(8, 8, 8);
            mesa.rotation.z = THREE.Math.degToRad(-45);
            scene.add(gltf.scene);

        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
    /* Modelo 6 */
    loader.load(
        `modelos/modelo6/scene.gltf`,
        function(gltf) {
            cuchillo = gltf.scene.children[0];
            cuchillo.position.x = 45;
            cuchillo.position.y = 9;
            cuchillo.position.z = 0;

            cuchillo.receiveShadow = true;
            cuchillo.scale.set(2, 2, 2);
            scene.add(gltf.scene);

        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );

    /* Funcion para cargar el texto 3d */
    //Texto
    let geometriaText;
    cargadorTexto.load('fuentes/Wind Sans Serif_Regular.json', function(font) { //Instancia para cargar la fuente del texto

        const geometria = new TextGeometry('Perro', { //Agrego geometria 
            font: font,
            size: 5,
            height: 2,
            curveSegments: 10,
        });
        var materialText = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff });
        geometriaText = new THREE.Mesh(geometria, materialText); //Agrego la geometria y el material del texto
        geometriaText.position.x = 35;
        geometriaText.position.y = 20;
        geometriaText.position.z = 90;
        geometriaText.rotation.y = THREE.Math.degToRad(180);
        scene.add(geometriaText); //Se agrega el texto a la escena
    });


    let geometriaText2;
    cargadorTexto.load('fuentes/Wind Sans Serif_Regular.json', function(font) {

        const geometria2 = new TextGeometry('Gato', {
            font: font,
            size: 5,
            height: 2,
            curveSegments: 10,
        });
        var materialText2 = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff });
        geometriaText2 = new THREE.Mesh(geometria2, materialText2);
        geometriaText2.position.x = -15;
        geometriaText2.position.y = 20;
        geometriaText2.position.z = 90;
        geometriaText2.rotation.y = THREE.Math.degToRad(180);
        scene.add(geometriaText2);
    });

    let geometriaText3;
    cargadorTexto.load('fuentes/Wind Sans Serif_Regular.json', function(font) {

        const geometria3 = new TextGeometry('Faro', {
            font: font,
            size: 5,
            height: 2,
            curveSegments: 10,
        });
        var materialText3 = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff });
        geometriaText3 = new THREE.Mesh(geometria3, materialText3);
        geometriaText3.position.x = -30;
        geometriaText3.position.y = 20;
        geometriaText3.position.z = -110;
        geometriaText3.rotation.y = THREE.Math.degToRad(360);
        scene.add(geometriaText3);
    });

    let geometriaText4;
    cargadorTexto.load('fuentes/Wind Sans Serif_Regular.json', function(font) {

        const geometria4 = new TextGeometry('Tren-Vía', {
            font: font,
            size: 5,
            height: 2,
            curveSegments: 10,
        });
        var materialText4 = new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff });
        geometriaText4 = new THREE.Mesh(geometria4, materialText4);
        geometriaText4.position.x = 10;
        geometriaText4.position.y = 20;
        geometriaText4.position.z = -110;
        geometriaText4.rotation.y = THREE.Math.degToRad(360);
        scene.add(geometriaText4);
    });

    let geometriaTextFinal;
    cargadorTexto.load('fuentes/Wind Sans Serif_Regular.json', function(font) {

        const geometria5 = new TextGeometry('Hecho-por-Juan-Manuel-Viracacha-64961', {
            font: font,
            size: 3,
            height: 1,
            curveSegments: 10,
        });
        var materialText5 = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff });
        geometriaTextFinal = new THREE.Mesh(geometria5, materialText5);
        geometriaTextFinal.position.x = 50;
        geometriaTextFinal.position.y = 20;
        geometriaTextFinal.position.z = -45;
        geometriaTextFinal.rotation.y = THREE.Math.degToRad(270);
        scene.add(geometriaTextFinal);
    });

    video1(40, 20); //Llamo la funcion videos para agregarlos a la escena
    video2(40, 20);
    video3(40, 20);
    video4(40, 20);

    ambientAudio();
    animate();


}

/* Plano*/

function drawPlane(w, h, sh, sw, color, ds = false, textura) { //Funcion para crear el plano
    const geometry = new THREE.PlaneGeometry(w, h, sw, sh); //se agrega geometria 
    const material = new THREE.MeshPhongMaterial({
        color,
        side: ds ? THREE.DoubleSide : undefined,
        map: textura,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    return plane;
}

/* Cubo */

function drawCube(w, h, d, color, wireframe = false, textura) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
        color,
        wireframe: wireframe,
        map: textura,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
}



/* Videos */
function video1(w, h) {
    let video = document.getElementById('video'); //Intancia para llamar el video en el HTML
    let texture = new THREE.VideoTexture(video); //Cargo el VideoTexture para montarlo al plano

    const geometry = new THREE.PlaneGeometry(w, h); //Toma los valore de w y h que son 40 y 20
    const material = new THREE.MeshLambertMaterial({ //Crea la geometría
        map: texture,
    });
    const plano = new THREE.Mesh(geometry, material);
    plano.receiveShadow = true;
    plano.position.x = -49;
    plano.position.y = 15;
    plano.position.z = 70;
    plano.rotation.y = Math.PI / 2;
    scene.add(plano); //Agrego plano a la escena
}

function video2(w, h) {
    let video = document.getElementById('video2');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const plano = new THREE.Mesh(geometry, material);
    plano.receiveShadow = true;
    plano.position.x = 49;
    plano.position.y = 15;
    plano.position.z = 70;
    plano.rotation.y = Math.PI / -2;
    scene.add(plano);
}

function video3(w, h) {
    let video = document.getElementById('video3');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const plano = new THREE.Mesh(geometry, material);
    plano.receiveShadow = true;
    plano.position.x = 49;
    plano.position.y = 15;
    plano.position.z = -80;
    plano.rotation.y = Math.PI / -2;
    scene.add(plano);
}

function video4(w, h) {
    let video = document.getElementById('video4');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const plano = new THREE.Mesh(geometry, material);
    plano.receiveShadow = true;
    plano.position.x = -49;
    plano.position.y = 15;
    plano.position.z = -80;
    plano.rotation.y = Math.PI / 2;
    scene.add(plano);
}

/* Funcio Cargar audio */

function ambientAudio() {
    const audioListener = new THREE.AudioListener();

    // add the listener to the camera
    camera.add(audioListener);

    // instantiate audio object
    const oceanAmbientSound = new THREE.Audio(audioListener);

    // add the audio object to the scene
    scene.add(oceanAmbientSound);

    // instantiate a loader
    const loader = new THREE.AudioLoader();

    // load a resource
    loader.load(
        // resource URL
        'audio/audio.mp3',

        // onLoad callback
        function(audioBuffer) {
            // set the audio object buffer to the loaded object
            oceanAmbientSound.setBuffer(audioBuffer);

            // play the audio
            oceanAmbientSound.play();
        },

        // onProgress callback
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },

        // onError callback
        function(err) {
            console.log('An error happened');
        }
    );

}

/* Funcion Animate */

// Declaraciones //
var keyboard = {};
var player = { height: 3.5, speed: 0.08, turnSpeed: Math.PI * 0.01 };

// Controls
camera.position.set(0, player.height, -5);
camera.lookAt(new THREE.Vector3(0, player.height, 0));

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function animate() {
    requestAnimationFrame(animate);
    if (keyboard[87]) { // W key
        camera.position.x -= (Math.sin(camera.rotation.y) * player.speed) * 5;
        camera.position.z -= (-Math.cos(camera.rotation.y) * player.speed) * 5;
    }
    if (keyboard[83]) { // S key
        camera.position.x += (Math.sin(camera.rotation.y) * player.speed) * 5;
        camera.position.z += (-Math.cos(camera.rotation.y) * player.speed) * 5;
    }
    if (keyboard[65]) { // A key
        camera.position.x += (Math.sin(camera.rotation.y + Math.PI / 2) * player.speed) * 5;
        camera.position.z += (-Math.cos(camera.rotation.y + Math.PI / 2) * player.speed) * 5;
    }
    if (keyboard[68]) { // D key
        camera.position.x += (Math.sin(camera.rotation.y - Math.PI / 2) * player.speed) * 5;
        camera.position.z += (-Math.cos(camera.rotation.y - Math.PI / 2) * player.speed) * 5;
    }
    if (keyboard[37]) { // left arrow key
        camera.rotation.y -= player.turnSpeed * 0.8;
    }
    if (keyboard[39]) { // right arrow key
        camera.rotation.y += player.turnSpeed * 0.8;
    }
    renderer.render(scene, camera);

}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}