import * as vscode from "vscode";
import { getWarpActionUri } from "./uri";

/**
 * Get the workspace folder path for the current context
 */
const getWorkspacePath = (uri?: vscode.Uri): string => {
  const homedir = require("os").homedir();
  
  if (!uri) {
    // Should just throw an error 
    return homedir;
  }

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

  // Fallback to first workspace folder
  // Should handle multi root workspace, if length equals 0, just use the first one 
  // If the length lg then 1, should show a picked, let the user choose the entry 
  if (vscode.workspace.workspaceFolders?.length) {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  }

  return homedir;
};

/**
 * Open Warp terminal in a new window with the specified path
 */
async function openWarpInNewWindow(uri?: vscode.Uri): Promise<void> {
  const workspacePath = getWorkspacePath(uri);
  const warpUri = getWarpActionUri.newWindow(workspacePath);
  console.log(`Opening Warp window with path: ${workspacePath}`);
  console.log(`Warp URI: ${warpUri}`);

  const success = await vscode.env.openExternal(vscode.Uri.parse(warpUri));

  if (!success) {
    vscode.window.showErrorMessage(
      "Failed to open Warp terminal. Make sure Warp is installed and supports URI schemes.",
    );
  }
}

/**
 * Open Warp terminal in a new tab with the specified path
 */
async function openWarpInNewTab(uri?: vscode.Uri): Promise<void> {
  const workspacePath = getWorkspacePath(uri);
  const warpUri = getWarpActionUri.newTab(workspacePath);
  console.log(`Opening Warp tab with path: ${workspacePath}`);
  console.log(`Warp URI: ${warpUri}`);

  const success = await vscode.env.openExternal(vscode.Uri.parse(warpUri));

  if (!success) {
    vscode.window.showErrorMessage(
      "Failed to open Warp terminal. Make sure Warp is installed and supports URI schemes.",
    );
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Warp Terminal extension is now active!");

  // Register the commands
  const disposableWindow = vscode.commands.registerCommand(
    "warp-terminal.openInNewWindow",
    openWarpInNewWindow,
  );

  const disposableTab = vscode.commands.registerCommand(
    "warp-terminal.openInNewTab",
    openWarpInNewTab,
  );

  context.subscriptions.push(disposableWindow, disposableTab);

  // Show activation message
  vscode.window.showInformationMessage("Warp Terminal extension activated!");
}

export function deactivate() {
  console.log("Warp Terminal extension is now deactivated!");
}
