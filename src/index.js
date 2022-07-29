import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import "./styles/global.scss";
import "./styles/reset.scss";
import "./styles/variables.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
