//= Functions & Modules
// Packages
import React from "react";
import ajaxRequest from "@softprovider/ajaxutils-es5";
import { boundMethod } from "autobind-decorator";

//= Structures & Data
// Own
import ScreenSize from "./data/ScreenSize";
import Routes from "./data/Routes";

//= React components
// Own
import TopBar from "./components/TopBar";
import Menu from "./components/Menu";
import Component from "./components/Component";
// Packages
import { Redirect, Route, Switch } from "react-router";
import { Suspense } from "react";

//= Style & Assets
import "./style/App.scss";

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        window.appRoutes = Routes;
        window.modulesComponents = {};

        Routes.forEach(routeData => {
            console.log(routeData.id, routeData.component);
            window.modulesComponents[routeData.id] = React.lazy(routeData.component);
        })
    }

    render() {
        return <>
            <TopBar/>
            <div id="App_Main">
                <Menu
                    alwaysDisplay={window.screenSize >= ScreenSize.DESKTOP_MIN}
                />
                <Switch>
                    <Suspense fallback={<div>Loading</div>}>
                        {
                            window.appRoutes.map(routeData => {
                                if (routeData.component) {
                                    return <Route
                                        key={routeData.route} 
                                        to={routeData.route} 
                                        component={window.modulesComponents[routeData.id]}
                                    />;
                                } else {
                                    return <Route 
                                        key={routeData.route} 
                                        to={routeData.route} 
                                        component={<Component appID="efe"/>}
                                    />;
                                }
                            })
                        }
                    </Suspense>
                    <Redirect from="*" to={window.appRoutes[0].route}/>
                </Switch>
            </div>
        </>;
    }
}