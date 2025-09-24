import { defaultWindowIcon } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";
import { Menu, type MenuOptions } from "@tauri-apps/api/menu";
import { TrayIcon } from "@tauri-apps/api/tray";
import { useEffect, useState } from "react";

import "./App.css";
import reactLogo from "./assets/react.svg";

let tray: TrayIcon;

async function setupTray(options: MenuOptions) {
  const menu = await Menu.new(options);

  if (!tray) {
    tray = await TrayIcon.new({
      icon: (await defaultWindowIcon()) ?? "",
      menuOnLeftClick: true,
    });
  }

  tray.setMenu(menu);
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => { 
    setupTray({
      items: [
        {
          id: "greet",
          text: "Greet",
          action: async () => {
            setGreetMsg(await invoke("greet", { name: "Menu" }));
          },
        },

        { id: "quit", text: "Quit", accelerator: "CmdOrCtrl+Q" },
      ],
    });
 }, []);

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
