import { Button, IconButton } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import DeleteIcon from "@mui/icons-material/Clear";
import "./front-menu-content.css";

export const ModelListMenu: FC = () => {
  const [state, dispatch] = useAppContext();
  const { building, user } = state;

  if (!building || !user) {
    throw new Error("Error: building or user not found");
  }

  const onUploadModel = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.style.visibility = "hidden";
    document.body.appendChild(input);

    input.onchange = () => {
      if (input.files && input.files.length) {
        const file = input.files[0];
        if (!file.name.includes(".ifc")) return;

        const newBuilding = { ...building };
        const id = `${file.name}-${performance.now()}`;
        const model = { name: file.name, id };
        newBuilding.models.push(model);

        // Update building name with all model names joined
        newBuilding.name = newBuilding.models.map((m) => m.name).join(", ");

        console.log("Building name after upload:", newBuilding.name); // Debugging output
        console.log("Building models after upload:", newBuilding.models); // Debugging output

        dispatch({
          type: "UPLOAD_MODEL",
          payload: {
            building: newBuilding,
            file,
            model,
          },
        });
      }
      input.remove();
    };
    input.click();
  };

  const onDeleteModel = (id: string) => {
    // Clone the building state to avoid mutations
    const newBuilding = { ...building };

    // Log the current state of the building before deletion
    console.log("Building before deletion:", newBuilding);
    console.log("ID to delete:", id);

    // Check if models is an array and log current models
    if (!Array.isArray(newBuilding.models)) {
      console.error("Models is not an array:", newBuilding.models);
      return;
    }
    
    console.log("Current models:", newBuilding.models);

    // Find the model to delete
    const modelIndex = newBuilding.models.findIndex((model) => model.id === id);
    
    // Check if the model exists
    if (modelIndex === -1) {
      console.error("Model not found for deletion:", id);
      return; // Exit if the model isn't found
    }

    // Log the model to be deleted
    console.log("Deleting model:", newBuilding.models[modelIndex]);

    // Remove the model from the models array
    newBuilding.models.splice(modelIndex, 1); // Use splice to remove the model by index

    // Update building name with the remaining models' names
    newBuilding.name = newBuilding.models.length > 0 
      ? newBuilding.models.map((model) => model.name).join(", ") 
      : ""; // Set to empty if no models remain

    console.log("Building name after deletion:", newBuilding.name); // Debugging output

    dispatch({
      type: "DELETE_MODEL",
      payload: { building: newBuilding },
    });
  };

  return (
    <div className="full-width">
      {Array.isArray(building.models) && building.models.length ? (
        building.models.map((model) => (
          <div className="list-item" key={model.id}>
            <IconButton onClick={() => onDeleteModel(model.id)}>
              <DeleteIcon />
            </IconButton>
            <span className="margin-left">{model.name}</span>
          </div>
        ))
      ) : (
        <p>This building has no models!</p>
      )}
      <div className="list-item">
        <Button onClick={onUploadModel} className="submit-button">
          Upload model
        </Button>
      </div>
    </div>
  );
};
