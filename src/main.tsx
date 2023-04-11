import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./contexts/theme.context";
import { FavoriteProvider } from "./contexts/favorite.context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </ThemeProvider>
  </React.StrictMode>
);
