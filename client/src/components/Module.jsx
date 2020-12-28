//= Functions & Modules
// Packages
import React from "react";
import PropTypes from "prop-types";

//= Style & Assets
import "../style/components/Module.scss";

export default class Module extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.any.isRequired
    };

    render() {
        return (
            <div 
                id={this.props.id}
                className="Module"
            >
                { this.props.children }
            </div>
        )
    }
}