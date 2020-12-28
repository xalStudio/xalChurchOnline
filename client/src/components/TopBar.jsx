//= Functions & Modules
// Packages
import React from "react";
import PropTypes from "prop-types";

//= React components
// Own
import ServerStatusCircle from "../modules/app_status/components/ServerStatusCircle";

//= Style & Assets
import "../style/components/TopBar.scss";
import BarsSolidSVG from "../assets/barsSolid.svg";

export default class TopBar extends React.PureComponent {
    static propTypes = {
    };

    render() {
        return (
            <div id="App_TopBar">
                <div id="TopBar_Left">
                    <div
                        id="TopBar_Menu"
                        onClick={window.showMenu}
                    >
                        <BarsSolidSVG/>
                    </div>
                </div>
                <div id="TopBar_Right">
                    <ServerStatus/>
                </div>
            </div>
        );
    }
}

class ServerStatus extends React.PureComponent {
    render() {
        return (
            <div 
                id="TopBar_ServerStatus"
            >
                <ServerStatusCircle/>
            </div>
        )
    }
}