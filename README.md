# Warp Terminal Extension

A VS Code extension that allows you to open Warp terminal in a new window with the current project path.

## Features

- **Open Warp in New Window**: Opens Warp terminal in a new window with the current workspace folder as the working directory
- **Open Warp in New Tab**: Opens Warp terminal in a new tab with the current workspace folder as the working directory
- **Warp Version Selection**: Choose between stable (`warp://`) and preview (`warppreview://`) builds in VS Code settings
- **Context Menu Integration**: Right-click on files/folders in the Explorer or editor to open Warp with that specific path
- **Command Palette Support**: Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and search for "Open Warp Terminal" commands

## Why I Created This Extension

I wanted an easy way to open VS Code projects in Warp terminal with better control over window management.

While VS Code has a great [`external terminal`](https://docs.warp.dev/terminal/integrations-and-plugins#vscode) feature, it always reuses existing Warp windows. This means if you already have a Warp window open for project `Foo` and want to open a new project `Bar`, it will always create a new tab instead of a new window. For my workflow, I prefer having separate windows for different projects.

That's why I first implemented "Open Warp Terminal in New Window" - it always creates a fresh Warp window. Then I added "Open Warp Terminal in New Tab" for users who prefer the tab behavior (similar to the built-in external terminal).

Now that we have this foundation, why not add more VS Code and Warp integrations? Here are the features I'm planning to add (see [Roadmap](#roadmap) for details):


## Usage

### Method 1: Command Palette

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Open Warp Terminal" to see both options:
   - "Open Warp Terminal in New Window"
   - "Open Warp Terminal in New Tab"
3. Select your preferred option and press Enter

### Method 2: Context Menu

1. Right-click on any file or folder in the Explorer panel
2. Choose either:
   - "Open Warp Terminal in New Window" - Opens a completely new Warp window
   - "Open Warp Terminal in New Tab" - Opens a new tab in existing Warp window
3. Warp will open with that folder as the working directory

### Method 3: Editor Context Menu

1. Right-click in any open editor
2. Choose either:
   - "Open Warp Terminal in New Window" - Opens a completely new Warp window
   - "Open Warp Terminal in New Tab" - Opens a new tab in existing Warp window
3. Warp will open with the file's folder as the working directory

## How It Works

This extension uses Warp's URI schemes to open terminal sessions with the specified directory:

- **New Window**: `warp://action/new_window?path=<path>` - Opens a completely new Warp window
- **New Tab**: `warp://action/new_tab?path=<path>` - Opens a new tab in existing Warp window

The implementation is based on the [Raycast Warp extension](https://github.com/raycast/extensions/blob/main/extensions/warp/src/uri.ts).

## Release Notes

### 0.0.2

New features:
- **Warp Version Selection**: Added configuration option to choose between stable and preview Warp builds

### 0.0.1

Initial release with basic functionality:

- Open Warp terminal in new window with project path
- Open Warp terminal in new tab with project path
- Context menu integration for both options
- Command palette support for both options

## Roadmap

I am continuously working to improve the Warp Terminal extension. Here are some features we're planning to add:

- [x] **Warp Version Selection** - Add settings option to choose between stable (`warp://`) and preview (`warppreview://`) builds 
- [ ] **Launch Configurations Sidebar** - Add a dedicated sidebar panel to manage and display launch configurations
- [ ] **Configuration Search** - Support searching and filtering launch configurations through the command palette
- [ ] **Active Tab Integration** - Add functionality to open the currently active tab/file location in Warp

Have a feature request? Feel free to [open an issue](https://github.com/Caffeine19/code-warp/issues) or contribute to the project!

## Development

To work on this extension:

1. Clone the repository
2. Run `npm install`
3. Open in VS Code
4. Press `F5` to launch a new Extension Development Host window
5. Test the extension commands

## Acknowledgments

**Icon**: [macOS Icons](https://macosicons.com/#/?icon=BmkDzEexAE) - The best Warp Terminal icon ever!

## License

This project is licensed under the MIT License.


