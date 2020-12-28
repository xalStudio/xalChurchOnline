//= Functions & Modules
// Core web
import getScreenSize from "./utils/getScreenSize";
// Packages
import { render } from "react-dom";
import React from "react";
import { HashRouter } from "react-router-dom";

//= React components
// Own
import App from "./App";

window.serverStatus = "offline";
window.screenSize = getScreenSize();

render((
    <HashRouter>
        <App/>
    </HashRouter>
), document.getElementById("main"));
