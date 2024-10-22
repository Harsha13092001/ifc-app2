import { Floorplan, Property, Tree } from "./../types";
import { User } from "firebase/auth";
import { Building } from "../types";
export interface State {
  user: User | null;
  building: Building | null;
  floorplans: Floorplan[];
  properties: Property[];
  spatialtree: Tree[];
}

export const initialState: State = {
  user: null,
  building: null,
  floorplans: [],
  properties: [],
  spatialtree: [],
};
