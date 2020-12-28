//= Functions & Modules
// Packages
import React from "react";
import PropTypes from "prop-types";
import { boundMethod } from "autobind-decorator";

//= Structures & Data
// Own
import OnServerStatusChangedEventName from "../data/OnServerStatusChangedEventName";

//= Style & Assets
import CircleSolidSVG from "assets/circleSolid.svg";
import "../style/components/ServerStatusCircle.scss";

export default class ServerStatusCircle extends React.PureComponent {
    static propTypes = {
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            serverStatus: window.serverStatus || "offline"
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
        this.setState({ serverStatus: event.detail });
    }

    render() {
        return (
            <div 
                id="ServerStatusCircle"
                onClick={this.props.onClick}
            >
                <CircleSolidSVG className={this.state.serverStatus}/>
            </div>
        )
    }
}