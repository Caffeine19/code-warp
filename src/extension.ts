import * as vscode from "vscode";

/**
 * Generate Warp URI for the specified action and path
 * Based on: https://github.com/raycast/extensions/blob/d480d47a5c3271f36134614ecdc49b2d447bccf2/extensions/warp/src/uri.ts
 */
function getWarpUri(action: "new_window" | "new_tab", path: string): string {
  // Use warp:// scheme for standard Warp app
  // Could be extended to support warppreview:// for preview builds
  const scheme = "warp://";
  return `${scheme}action/${action}?path=${encodeURIComponent(path)}`;
}

/**
 * Get the workspace folder path for the current context
 */
function getWorkspacePath(uri?: vscode.Uri): string {
  if (uri) {
    // If we have a specific URI (e.g., from context menu), use its folder
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
    if (workspaceFolder) {
      return workspaceFolder.uri.fsPath;
    }
    // If no workspace folder found, use the directory of the file
    if (uri.scheme === "file") {
      const path = require("path");
      return path.dirname(uri.fsPath);
    }
  }

  // Fallback to first workspace folder
  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
  ) {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  }

  // Last resort: use home directory
  const os = require("os");
  return os.homedir();
}

/**
 * Open Warp terminal with the specified action and path
 */
async function openWarp(
  action: "new_window" | "new_tab",
  uri?: vscode.Uri
): Promise<void> {
  try {
    const workspacePath = getWorkspacePath(uri);
    const warpUri = getWarpUri(action, workspacePath);
    const actionName = action === "new_window" ? "window" : "tab";

    console.log(`Opening Warp ${actionName} with path: ${workspacePath}`);
    console.log(`Warp URI: ${warpUri}`);

    const success = await vscode.env.openExternal(vscode.Uri.parse(warpUri));

    if (!success) {
      vscode.window.showErrorMessage(
        "Failed to open Warp terminal. Make sure Warp is installed and supports URI schemes."
      );
    }
  } catch (error) {
    console.error("Error opening Warp terminal:", error);
    vscode.window.showErrorMessage(
      `Error opening Warp terminal: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Open Warp terminal in a new window with the specified path
 */
async function openWarpInNewWindow(uri?: vscode.Uri): Promise<void> {
  return openWarp("new_window", uri);
}

/**
 * Open Warp terminal in a new tab with the specified path
 */
async function openWarpInNewTab(uri?: vscode.Uri): Promise<void> {
  return openWarp("new_tab", uri);
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Warp Terminal extension is now active!");

  // Register the commands
  const disposableWindow = vscode.commands.registerCommand(
    "warp-terminal.openInNewWindow",
    openWarpInNewWindow
  );

  const disposableTab = vscode.commands.registerCommand(
    "warp-terminal.openInNewTab",
    openWarpInNewTab
  );

  context.subscriptions.push(disposableWindow, disposableTab);

  // Show activation message
  vscode.window.showInformationMessage("Warp Terminal extension activated!");
}

export function deactivate() {
  console.log("Warp Terminal extension is now deactivated!");
}
