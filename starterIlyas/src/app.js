import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

function initWebGLOverlayView (map) {
  let scene, renderer, camera, loader;
  const webGLOverlayView = new google.maps.WebGLOverlayView();

  webGLOverlayView.onAdd = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.75 ); // soft white light
    scene.add( ambientLight );
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    loader = new GLTFLoader();
    const source = 'ball_opacity04.gltf';
    // const source = 'pin.gltf';
    loader.load(
      source,
      gltf => {
        gltf.scene.scale.set(7.5,7.5,7.5);
        gltf.scene.rotation.x = 180 * Math.PI/180;
        scene.add(gltf.scene);
      }
    );
  }

  webGLOverlayView.onContextRestored = ({gl}) => {
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });

    renderer.autoClear = false;

    loader.manager.onLoad = () => {}
  }



  
  webGLOverlayView.onDraw = ({gl, transformer}) => {
    const latLngAltitudeLiteral = {
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 100
    }

    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
    camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

    webGLOverlayView.requestRedraw();
    renderer.render(scene, camera);
    renderer.resetState();
  }
    


    webGLOverlayView.setMap(map)
    // Now you can add the model to the scene by appending the following to the loader callback. 
    // Note that gltf.scene is being added, not gltf:

  };

  const mapOptions = {
    isFractionalZoomEnabled: true,
      center: { lat: 35.6512331, lng: 139.6999859 },
      zoom: 18,
      heading: 320,
      tilt: 47.5,
      mapId: "17a8ad1938f39e53"
  }

  const apiOptions = {
    "apiKey": "AIzaSyCn7Rr8Z42pyOSVK2wA5IgmplP8934zJZg",
  };
  
async function initMap() {
  const apiLoader = new Loader(apiOptions);
  await apiLoader.load()
  const mapDiv = await new google.maps.Map(document.getElementById("map"), mapOptions);
  
  mapDiv.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('btn-group'))
  
}

(async () => {await initMap()})()
