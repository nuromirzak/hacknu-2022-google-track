import {Loader} from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {people} from "./dataSet";

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

(async () => {
    const map = await initMap();

    let personName = "dev7";

    await initWebGLOverlayView1(map, people[personName]);

})();


let set = new Set();

async function initWebGLOverlayView1(map, person) {
    let startTime = new Date();
    let tmpTime = startTime.getTime() + 1e9;
    for (let location of person) {
        startTime.setTime(Math.min(startTime.getTime(), tmpTime + location.timestamp ));
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

            console.log(new Date().getTime() - startTime.getTime());

            const res = (new Date().getTime() - startTime.getTime()) >= loc.timestamp;

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

async function initWebGLOverlayView2(map, person) {
    let startTime = 1e9;
    for (let location of person) {
        startTime = Math.min(startTime, location.timestamp);
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
        const source = 'scene.gltf';

        loader.load(source, gltf => {
            gltf.scene.scale.set(2, 2, 2);
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

async function initWebGLOverlayView3(map, person) {
    let startTime = 1e9;
    for (let location of person) {
        startTime = Math.min(startTime, location.timestamp);
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
        const source = 'scene.gltf';
        let zoom = map.zoom;
        console.log(zoom);
        loader.load(source, gltf => {
            gltf.scene.scale.set(5, 5, 5);
            gltf.scene.rotation.x = 90 * Math.PI / 180;

            console.log(gltf.scene.zoom);
            console.log(gltf);
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


            const res = (new Date().getTime() / 1000 - startTime.getTime() / 1000) >= loc.timestamp / 1000 &&
                (loc.timestamp / 1000 + 10) >= (new Date().getTime() / 1000) - (startTime.getTime() / 1000);

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


