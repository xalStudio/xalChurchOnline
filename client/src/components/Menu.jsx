//= Functions & Modules
// Packages
import React from "react";
import PropTypes from "prop-types";

//= React components
import { NavLink } from "react-router-dom";

//= Style & Assets
import "../style/components/Menu.scss";

export default class Menu extends React.PureComponent {
    static propTypes = {
        alwaysDisplay: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            show: false
        };

        window.showMenu = () => {
            this.setState({ show: true });
        }
    }

    render() {
        if (!this.props.alwaysDisplay && !this.state.show) return null;

        return (
            <div id="App_Menu">
                {
                    window.appRoutes.map(routeData => {
                        return (
                            <NavLink to={routeData.route} activeClassName="active">{ routeData.name }</NavLink>
                        );
                    })
                }
            </div>
        );
    }
}