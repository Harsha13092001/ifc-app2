// state.ts
import { Floorplan, Property, Tree, Building } from "./../types";
import { User } from "firebase/auth";

export interface State {
  user: User | null;
  building: Building; // Make this non-nullable
  floorplans: Floorplan[];
  properties: Property[];
  spatialtree: Tree[];
}

// Define initial state with a default building
export const initialState: State = {
  user: null,
  building: {
    uid: "default",
    userID: "defaultUser",
    name: "Default Building",
    models: [], // Start with an empty models array
    lat: 0,
    lng: 0,
  },
  floorplans: [],
  properties: [],
  spatialtree: [],
};
