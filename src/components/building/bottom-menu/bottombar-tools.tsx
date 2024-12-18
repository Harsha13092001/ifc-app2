import ExplodeIcon from "@mui/icons-material/ImportExport";
import CutIcon from "@mui/icons-material/ContentCut";
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ModeIcon from '@mui/icons-material/Mode';
import { Tool } from "../../../types";

export function getBottombarTools(): Tool[] {
  const tools = [
    {
      name: "Clipping planes",
      icon: <CutIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Clipping planes");
        deactivateAllTools(dispatch, "Clipping planes");
        tool.active = !tool.active;
        dispatch({ type: "TOGGLE_CLIPPER", payload: tool.active });
      },
    },
    {
      name: "Dimensions",
      icon: <SquareFootIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Dimensions");
        deactivateAllTools(dispatch, "Dimensions");
        tool.active = !tool.active;
        dispatch({ type: "TOGGLE_DIMENSIONS", payload: tool.active });
      },
    },
    {
      name: "Explosion",
      icon: <ExplodeIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Explosion");
        deactivateAllTools(dispatch, "Explosion");
        tool.active = !tool.active;
        dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
      },
    },
    {
      name: "Annotation",
      icon: <ModeIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Annotation");
        deactivateAllTools(dispatch, "Annotation");
        tool.active = !tool.active;
        dispatch({ type: "DRAW_MANAGER ", payload: tool.active });
      },
    },
  ];

  const findTool = (name: string) => {
    const tool = tools.find((tool) => tool.name === name);
    if (!tool) throw new Error("Tool not found!");
    return tool;
  };

  const deactivateAllTools = (dispatch: any, name: string) => {
    for (const tool of tools) {
      if (tool.active && tool.name !== name) {
        tool.action(dispatch);
      }
    }
  };

  return tools;
}
