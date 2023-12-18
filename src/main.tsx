import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.Fragment>
);
