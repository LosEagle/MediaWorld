import React from "react";
import ReactDOM from "react-dom";
import * as global from "./app/global";
import {HashRouter, Route, Switch} from "react-router-dom";
import "jquery";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "font-awesome/scss/font-awesome.scss";
import "../css/main.sass";
import IO from "./app/IO";

import Home from "./components/Home/Home.jsx";
import UserList from "./components/UserList/UserList.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import Detail from "./components/Detail/Detail.jsx";
import ImportExport from "./components/ImportExport/ImportExport.jsx";
import Settings from "./components/Settings/Settings.jsx";
import ManagerHelper from "./components/UserListManager/ManagerContainer/ManagerContainer.jsx";
import ResponsiveHeader from "./components/ResponsiveHeader/ResponsiveHeader.jsx";

const app = document.getElementById("app");
const sidebar = document.getElementById("sidebar");
const progressbar = document.getElementById("progressbar");
const responsiveHeader = document.getElementById("responsiveHeader");
const io = new IO;

export default class AppRouter extends React.Component {
    componentWillMount() {
        io.createFileIfNotExists(global.userItems);
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/userList" component={UserList}/>
                    <Route path="/userListManager" component={ManagerHelper}/>
                    <Route path="/calendar" component={Calendar}/>
                    <Route path="/detail/:id/:showName" component={Detail}/>
                    <Route path="/importExport" component={ImportExport}/>
                    <Route path="/settings" component={Settings}/>
                    <Route component={Home}/>
                </Switch>
            </HashRouter>
        );
    }
}

ReactDOM.render(<AppRouter />, app);
ReactDOM.render(<Sidebar />, sidebar);
ReactDOM.render(<Preloader visibility="hidden"/>, progressbar);
ReactDOM.render(<ResponsiveHeader />, responsiveHeader);