import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";
import "jquery";
import "materialize-css";
import "materialize-css/sass/materialize.scss";
import "../css/main.sass";
import "font-awesome/scss/font-awesome.scss";

import Home from "./components/Home/Home.jsx";
import UserList from "./components/UserList/UserList.jsx";
import UserListManager from "./components/UserListManager/UserListManager.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";

const app = document.getElementById("app");
const sidebar = document.getElementById("sidebar");
const progressbar = document.getElementById("progressbar");

class AppRouter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path={"/"} component={Home} />
                <Route path={"/userlist"} component={UserList} />
                <Route path={"/userlistmanager"} component={UserListManager} />
                <Route path={"/calendar"} component={Calendar} />
            </Router>
        );
    }
}

ReactDOM.render(<AppRouter />, app);
ReactDOM.render(<Sidebar />, sidebar);
ReactDOM.render(<Preloader visibility="hidden" />, progressbar);