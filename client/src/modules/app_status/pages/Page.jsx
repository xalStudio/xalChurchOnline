//= Functions & Modules
// Own
import checkServerStatus from "../utils/checkServerStatus";
// Packages
import React from "react";
import ajaxRequest from "@softprovider/ajaxutils-es5";
import { boundMethod } from "autobind-decorator";

//= React components
// Own
import ServerStatusModule from "../components/ServerStatusModule";
// App
import Module from "components/Module";

//= Style & Assets
import "../style/pages/Page.scss";

export default class AppStatusPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            connectedToServer: false
        };
    }

    componentDidMount() {
        checkServerStatus();
    }

    render() {
        return (
            <div id="AppStatusPage" className="page">
                <ServerStatusModule/>
                <UserModule/>
            </div>
        );
    }
}

class UserModule extends React.PureComponent {
    render() {
        return (
            <Module id="AppStatusPage_UserModule">
                
            </Module>
        );
    }
}