import * as THREE from "three";
import mapboxgl from "mapbox-gl";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { GisParameters, Building, LngLat } from "./types";
import { MAPBOX_KEY } from "../../config";
import { User } from "firebase/auth";
import { MapDatabase } from "./map-database";

export class MapScene {
  private map: mapboxgl.Map;
  private clickedCoordinates: LngLat = { lat: 0, lng: 0 };
  private center: LngLat = { lat: 0, lng: 0 };
  private labels: { [id: string]: CSS2DObject } = {};
  private database = new MapDatabase();

  constructor(container: HTMLDivElement) {
    const config = this.getConfig(container);
    this.map = this.createMap(config);
    this.createScene();
  }

  dispose() {
    this.map.remove();
    for (const id in this.labels) {
      const label = this.labels[id];
      label.element.remove();
    }
    this.labels = {};
  }

  async getAllBuildings(user: User) {
    const buildings = await this.database.getBuildings(user);
    this.addToScene(buildings);
  }

  async addBuilding(user: User) {
    const { lat, lng } = this.clickedCoordinates;
    const userID = user.uid;
    const building = { userID, lat, lng, uid: "" };
    building.uid = await this.database.add(building);
    this.addToScene([building]);
  }

  private addToScene(buildings: Building[]) {
    for (const building of buildings) {
      const { uid, lng, lat } = building;

      const htmlElement = this.createHTMLElement();

      const label = new CSS2DObject(htmlElement);

      const coords = mapboxgl.MercatorCoordinate.fromLngLat([lng, lat]);

      const centerCoords = mapboxgl.MercatorCoordinate.fromLngLat([
        this.center.lng,
        this.center.lat,
      ]);

      const modelX = coords.x - centerCoords.x;
      const modelY = coords.y - centerCoords.y;

      label.position.set(modelX, 0, modelY);

      this.map.getContainer().appendChild(label.element);
      this.labels[uid] = label;
    }
  }

  private createHTMLElement() {
    const div = document.createElement("div");
    div.textContent = "🏢";
    div.classList.add("thumbnail");
    return div;
  }

  private createMap(config: GisParameters & { accessToken: string }) {
    const map = new mapboxgl.Map({
      container: config.container,
      style: "mapbox://styles/mapbox/light-v10",
      center: [config.center[0], config.center[1]],
      zoom: config.zoom,
      pitch: config.pitch,
      bearing: config.bearing,
      antialias: true,
      accessToken: config.accessToken,
    });
    map.on("contextmenu", this.storeMousePosition);
    return map;
  }

  private storeMousePosition = (event: mapboxgl.MapMouseEvent) => {
    this.clickedCoordinates = event.lngLat;
  };

  private createScene() {
    const scene = new THREE.Scene();
    scene.background = null;
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(0, 70, 100).normalize();
    scene.add(directionalLight2);
  }

  private getConfig(container: HTMLDivElement) {
    const center: [number, number] = [7.730277288470006, 63.110047455818375];
    this.center = { lng: center[0], lat: center[1] }; // Optionally, you can assign this.center for consistency
    return {
      container,
      zoom: 15.35,
      pitch: 60,
      bearing: -40,
      center, // Modify center to be an array of numbers
      buildings: [],
      accessToken: MAPBOX_KEY, // Include accessToken here
    };
  }
  
}
