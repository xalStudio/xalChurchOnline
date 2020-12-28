//= Functions & Modules
// Packages
import React from "react";
import ajaxRequest from "@softprovider/ajaxutils-es5";
import { boundMethod } from "autobind-decorator";

//= Structures & Data
// Own
import OnServerStatusChangedEventName from "../data/OnServerStatusChangedEventName";

//= React components
// Own
import ServerStatusCircle from "./ServerStatusCircle";
// App
import Module from "components/Module";

//= Style & Assets
import "../style/components/ServerStatusModule.scss";

export default class ServerStatusModule extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            statusText: this.getStatusText(window.serverStatus)
        };
    }

    componentDidMount() {
        window.addEventListener(OnServerStatusChangedEventName, this.onServerStatusChanged);
    }

    componentWillUnmount() {
        window.removeEventListener(OnServerStatusChangedEventName, this.onServerStatusChanged);
    }

    @boundMethod
    onServerStatusChanged(event) {
        this.setState({ statusText: this.getStatusText(event.detail) });
    }

    @boundMethod
    getStatusText(serverStatus) {
        if (serverStatus == "offline") return "Offline";
        else if (serverStatus == "notConnected") return "Not connected";
        else return "Connected";
    }

    render() {
        return (
            <Module id="AppStatusPage_ServerStatusModule">
                <div id="ServerStatusModule_Main">
                    <div id="ServerStatusModule_Text">Server status:</div>
                    <div id="ServerStatusModule_Circle">
                        <ServerStatusCircle/>
                    </div>
                    <div id="ServerStatusModule_StatusText">{ this.state.statusText }</div>
                </div>
                <div id="ServerStatusModule_ServerAddress">
                    <div>Server address:</div>
                    <div>{ window.serverAddress || "Not set" }</div>
                </div>
                <div id="ServerStatusModule_Buttons">
                    <button
                        className="big"
                    >
                        Edit connection
                    </button>
                    <button
                        className="primary big"
                    >
                        Connect
                    </button>
                </div>
            </Module>
        );
    }
}