import {Loader} from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {data} from "./data";

const apiOptions = {
    "apiKey": "AIzaSyC2LS6l5A_9T6YvzwW1khKdeql1UpO6W_g",
};

const mapOptions = {
    "tilt": 45, "heading": 0, "zoom": 17, "center": {lat: 52.37190746, lng: 4.90526689}, "mapId": "fa802013bb42220"
}

async function initMap() {
    const mapDiv = document.getElementById("map");
    const apiLoader = new Loader(apiOptions);
    await apiLoader.load()
    return new google.maps.Map(mapDiv, mapOptions);
}

setTimeout(() => {
    (async () => {
        const map = await initMap();
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('btn-group'))

        for (let personName in data) {
            await initWebGLOverlayView(map, data[personName]);
            await initWebGLOverlayView1(map, data[personName]);
            await initWebGLOverlayView2(map, data[personName]);
            await initWebGLOverlayView3(map, data[personName]);
        }
    })();
}, 4000);


let set = new Set();

// Сам человек
async function initWebGLOverlayView(map, person) {
    let startTime = new Date();
    let tmpTime = startTime.getTime() + 1e9;
    for (let location of person) {
        startTime.setTime(Math.min(startTime.getTime(), tmpTime + location.timestamp));
    }

    person.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    let scene, renderer, camera, loader;

    // WebGLOverlayView code goes here
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.set(0.5, -1, 0.5);
        scene.add(directionalLight);

        loader = new GLTFLoader();
        const source = 'stickman_for_mobile.glb';

        loader.load(source, gltf => {
            gltf.scene.scale.set(20, 20, 20);
            gltf.scene.rotation.x = 90 * Math.PI / 180;
            gltf.scene.rotation.z = 180 * Math.PI / 90;
            gltf.scene.rotation.y = 90 * Math.PI / 90;
            scene.add(gltf.scene);
        });
    }

    webGLOverlayView.onContextRestored = ({gl}) => {
        renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas, context: gl, ...gl.getContextAttributes(),
        });

        renderer.autoClear = false;
    }

    webGLOverlayView.onDraw = ({gl, transformer}) => {
        const curTime = new Date().getTime() - startTime.getTime();
        for (let i = 0; i + 1 < person.length; i++) {
            if (person[i].timestamp < curTime && curTime < person[i + 1].timestamp) {
                const dx = person[i + 1].longitude - person[i].longitude;
                const dy = person[i + 1].latitude - person[i].latitude;
                const dz = person[i + 1].altitude - person[i].altitude;
                const dt = person[i + 1].timestamp - person[i].timestamp;
                const xSpeed = dx / dt;
                const ySpeed = dy / dt;
                const zSpeed = dz / dt;

                const dtCur = curTime - person[i].timestamp;

                const obj = {
                    lat: person[i].latitude + ySpeed * dtCur,
                    lng: person[i].longitude + xSpeed * dtCur,
                    altitude: person[i].altitude + zSpeed * dtCur
                };

                const matrix = transformer.fromLatLngAltitude(obj);
                camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
                webGLOverlayView.requestRedraw();
                renderer.render(scene, camera);
            }
        }

        renderer.resetState();
    }
    webGLOverlayView.setMap(map);
}

// Диск под ногами человека
async function initWebGLOverlayView1(map, person) {
    let startTime = new Date();
    let tmpTime = startTime.getTime() + 1e9;
    for (let location of person) {
        startTime.setTime(Math.min(startTime.getTime(), tmpTime + location.timestamp));
    }

    person.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    let scene, renderer, camera, loader;

    // WebGLOverlayView code goes here
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.set(0.5, -1, 0.5);
        scene.add(directionalLight);

        loader = new GLTFLoader();

        const disk = 'disk.glb';

        loader.load(disk, gltf => {
            gltf.scene.scale.set(5, 5, 5);
            gltf.scene.rotation.x = 180 * Math.PI / 360;
            scene.add(gltf.scene);
        });
    }

    webGLOverlayView.onContextRestored = ({gl}) => {
        renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas, context: gl, ...gl.getContextAttributes(),
        });

        renderer.autoClear = false;
    }

    webGLOverlayView.onDraw = ({gl, transformer}) => {
        const curTime = new Date().getTime() - startTime.getTime();
        for (let i = 0; i + 1 < person.length; i++) {
            if (person[i].timestamp < curTime && curTime < person[i + 1].timestamp) {
                const dx = person[i + 1].longitude - person[i].longitude;
                const dy = person[i + 1].latitude - person[i].latitude;
                const dz = person[i + 1].altitude - person[i].altitude;

                const horizontalAccuracyX = person[i + 1].horizontal_accuracy - person[i].horizontal_accuracy;
                const verticalAccuracyX = person[i + 1].vertical_accuracy - person[i].vertical_accuracy;

                const dt = person[i + 1].timestamp - person[i].timestamp;

                const xSpeed2 = horizontalAccuracyX / dt;

                const ySpeed2 = verticalAccuracyX / dt;

                const xSpeed = dx / dt;
                const ySpeed = dy / dt;
                const zSpeed = dz / dt;

                const dtCur = curTime - person[i].timestamp;

                // set scale
                scene.scale.set(5 + xSpeed2 * dtCur,
                    5 + xSpeed2 * dtCur,
                    5 + ySpeed2 * dtCur);

                const obj = {
                    lat: person[i].latitude + ySpeed * dtCur,
                    lng: person[i].longitude + xSpeed * dtCur,
                    altitude: person[i].altitude + zSpeed * dtCur
                };

                const matrix = transformer.fromLatLngAltitude(obj);
                camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
                webGLOverlayView.requestRedraw();
                renderer.render(scene, camera);
            }
        }

        renderer.resetState();
    }
    webGLOverlayView.setMap(map);
}

// Для следов
async function initWebGLOverlayView2(map, person) {
    let startTime = new Date();
    let tmpTime = startTime.getTime() + 1e9;
    for (let location of person) {
        startTime.setTime(Math.min(startTime.getTime(), tmpTime + location.timestamp));
    }
    let scene, renderer, camera, loader;

    // WebGLOverlayView code goes here
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.set(0.5, -1, 0.5);
        scene.add(directionalLight);

        loader = new GLTFLoader();
        const source = 'pin.gltf';

        loader.load(source, gltf => {
            gltf.scene.scale.set(5, 5, 5);
            gltf.scene.rotation.x = 180 * Math.PI / 180;
            scene.add(gltf.scene);
        });
    }

    webGLOverlayView.onContextRestored = ({gl}) => {
        renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas, context: gl, ...gl.getContextAttributes(),
        });

        renderer.autoClear = false;
    }

    webGLOverlayView.onDraw = ({gl, transformer}) => {

        person.forEach(loc => {
            const obj = {lat: loc.latitude, lng: loc.longitude, altitude: loc.altitude}


            const res = (new Date().getTime() / 1000 - startTime.getTime() / 1000) >= loc.timestamp / 1000;

            if (res) {
                const matrix = transformer.fromLatLngAltitude(obj);
                camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
                webGLOverlayView.requestRedraw();
                renderer.render(scene, camera);
                if (!set.has(loc)) {
                    map.panTo(obj);
                    set.add(loc);
                }
            }
        });

        renderer.resetState();
    }
    webGLOverlayView.setMap(map);
}

// Для палки
async function initWebGLOverlayView3(map, person) {
    let startTime = new Date();
    let tmpTime = startTime.getTime() + 1e9;
    for (let location of person) {
        startTime.setTime(Math.min(startTime.getTime(), tmpTime + location.timestamp));
    }

    person.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });

    let scene, renderer, camera, loader;

    // WebGLOverlayView code goes here
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera();
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
        directionalLight.position.set(0.5, -1, 0.5);
        scene.add(directionalLight);

        loader = new GLTFLoader();

        const disk = 'line3rdVersion.glb';

        loader.load(disk, gltf => {
            gltf.scene.scale.set(1, 2, 5);
            gltf.scene.rotation.x = 180 * Math.PI / 360;
            scene.add(gltf.scene);
        });
    }

    webGLOverlayView.onContextRestored = ({gl}) => {
        renderer = new THREE.WebGLRenderer({
            canvas: gl.canvas, context: gl, ...gl.getContextAttributes(),
        });

        renderer.autoClear = false;
    }

    webGLOverlayView.onDraw = ({gl, transformer}) => {
        const curTime = new Date().getTime() - startTime.getTime();
        for (let i = 0; i + 1 < person.length; i++) {
            if (person[i].timestamp < curTime && curTime < person[i + 1].timestamp) {
                const dx = person[i + 1].longitude - person[i].longitude;
                const dy = person[i + 1].latitude - person[i].latitude;
                const dz = person[i + 1].altitude - person[i].altitude;

                const horizontalAccuracyX = person[i + 1].horizontal_accuracy - person[i].horizontal_accuracy;
                const verticalAccuracyX = person[i + 1].vertical_accuracy - person[i].vertical_accuracy;

                const dt = person[i + 1].timestamp - person[i].timestamp;

                const xSpeed2 = horizontalAccuracyX / dt;

                const ySpeed2 = verticalAccuracyX / dt;

                const xSpeed = dx / dt;
                const ySpeed = dy / dt;
                const zSpeed = dz / dt;

                const dtCur = curTime - person[i].timestamp;

                // set scale
                scene.scale.set(5 + xSpeed2 * dtCur,
                    5 + xSpeed2 * dtCur,
                    5 + ySpeed2 * dtCur);

                const obj = {
                    lat: person[i].latitude + ySpeed * dtCur,
                    lng: person[i].longitude + xSpeed * dtCur,
                    altitude: person[i].altitude + zSpeed * dtCur
                };

                const matrix = transformer.fromLatLngAltitude(obj);
                camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);
                webGLOverlayView.requestRedraw();
                renderer.render(scene, camera);
            }
        }

        renderer.resetState();
    }
    webGLOverlayView.setMap(map);
}
