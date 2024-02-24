import * as THREE from "three";
import { GisParameters } from "./types";
import { MAPBOX_KEY } from "../../config";
import mapboxgl from "mapbox-gl";

export class MapScene {
  private map!: mapboxgl.Map;

  constructor(container: HTMLDivElement) {
    const config = this.getConfig(container);
    this.initializeMap(config);
    this.createScene();
  }

  dispose() {
    this.map.remove();
  }

  private initializeMap(config: GisParameters) {
    this.map = new mapboxgl.Map({
      ...config,
      style: "mapbox://styles/mapbox/light-v10",
      antialias: true,
    });
  }

  private createScene() {
    const scene = new THREE.Scene();
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    scene.add(directionalLight2);
  }

  private getConfig(container: HTMLDivElement) {
    const center = [7.730277288470006, 63.110047455818375] as [number, number];
    return {
      container,
      accessToken: MAPBOX_KEY,
      zoom: 15.35,
      pitch: 60,
      bearing: -40,
      center,
      buildings: [],
    };
  }
}
