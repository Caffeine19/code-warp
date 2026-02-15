import * as vscode from "vscode";

type WarpVersion = "stable" | "preview";

const getWarpUriScheme = () => {
  const config = vscode.workspace.getConfiguration("warp-terminal");
  const warpVersion = config.get<WarpVersion>("warpVersion", "stable");
  return warpVersion === "stable" ? "warp://" : "warppreview://";
};

export const getWarpActionUri = {
  newWindow: (pathToFolder: string) =>
    `${getWarpUriScheme()}action/new_window?path=${encodeURIComponent(pathToFolder)}`,

  newTab: (pathToFolder: string) =>
    `${getWarpUriScheme()}action/new_tab?path=${encodeURIComponent(pathToFolder)}`,

  launchConfiguration: (launchConfigurationPath: string) =>
    `${getWarpUriScheme()}launch/${encodeURIComponent(launchConfigurationPath)}`,
};
