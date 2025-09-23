import { TrayIcon } from '@tauri-apps/api/tray';
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
const menu = await Menu.new({
  items: [
    { id: 'quit', text: 'Quit',}
  ]
})

await TrayIcon.new({
  icon: await defaultWindowIcon() ?? '',
  menu,
  menuOnLeftClick: true,
});
