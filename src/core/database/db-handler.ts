import { getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { Events } from "../../middleware/event-handler";
import { Building, Model } from "../../types";
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { buildingHandler } from "../building/building-handler";

export const databaseHandler = {
  login: () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  },

  logout: () => {
    const auth = getAuth();
    signOut(auth);
  },

  deleteBuilding: async (building: Building, events: Events) => {
    const id = building.uid;
    const dbInstance = getFirestore(getApp());
    await deleteDoc(doc(dbInstance, "buildings", id));
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const ids: string[] = [];
    for (const model of building.models) {
      ids.push(model.id);
      const fileRef = ref(storageInstance, model.id);
      await deleteObject(fileRef);
     
    }
    await buildingHandler.deleteModels(ids);
    events.trigger({ type: "CLOSE_BUILDING" });
  },

  updateBuilding: async (building: Building) => {
    const dbInstance = getFirestore(getApp());
    await updateDoc(doc(dbInstance, "buildings", building.uid), {
      ...building,
    });
  },

  uploadModel: async (
    model: Model,
    file: File,
    building: Building,
    events: Events
  ) => {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    const fileRef = ref(storageInstance, model.id);
    await uploadBytes(fileRef, file);
    await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
  },

  deleteModel: async (model: Model, building: Building, events: Events) => {
  try {
    const appInstance = getApp();
    const storageInstance = getStorage(appInstance);
    
    // Check if the model exists in the building before attempting to delete
    const modelIndex = building.models.findIndex(m => m.id === model.id);
    if (modelIndex === -1) {
      console.error("Model not found for deletion:", model.id);
      return; // Exit if the model isn't found
    }

    // Reference to the model's file in storage
    const fileRef = ref(storageInstance, model.id);
    
    // Delete the file from storage
    await deleteObject(fileRef);
    
    // Refresh models and trigger event after successful deletion
    await buildingHandler.refreshModels(building, events);
    events.trigger({ type: "UPDATE_BUILDING", payload: building });
    
    console.log("Model deleted successfully:", model.id);
  } catch (error) {
    console.error("Error deleting model:", error);
  }
},

};
