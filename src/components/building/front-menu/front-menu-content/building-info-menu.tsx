import { Button, TextField, Box } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";

export const BuildingInfoMenu: FC<{
  onToggleMenu: (active: boolean) => void;
}> = ({ onToggleMenu }) => {
  const [state, dispatch] = useAppContext();
  const { building } = state;

  if (!building) {
    throw new Error("No building active!");
  }

  const onUpdateBuilding = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onToggleMenu(false);
  };

  return (
    <Box component="form" onSubmit={onUpdateBuilding} className="full-width">
      <div className="list-item">
        <TextField
          required
          fullWidth
          id="building-id"
          label="Building ID"
          name="building-id"
          autoComplete="building-id"
          value={building.uid}
          disabled
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          id="building-name"
          label="Building Name"
          name="building-name"
          autoComplete="building-name"
          value={building.name} // Set to uploaded file name
          multiline
          disabled // Make it non-editable
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          required
          id="building-lng"
          label="Longitude"
          name="building-lng"
          autoComplete="building-lng"
          value={building.lng}
          disabled
        />
      </div>
      <div className="list-item">
        <TextField
          fullWidth
          required
          id="building-lat"
          label="Latitude"
          name="building-lat"
          autoComplete="building-lat"
          value={building.lat}
          disabled
        />
      </div>
      <div className="list-item">
        <Button type="submit" className="submit-button">
          Update building
        </Button>
      </div>
    </Box>
  );
};
