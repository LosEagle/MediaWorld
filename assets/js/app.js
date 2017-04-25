import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from "react-router";

require("jquery");
require("materialize-css");
require("materialize-css/sass/materialize.scss");
require("../css/main.sass");
require("font-awesome/scss/font-awesome.scss");

const Home = require("./components/Home");
const UserList = require("./components/UserList");
const UserListManager = require("./components/UserListManager");
const Calendar = require("./components/Calendar");
const Sidebar = require("./components/Sidebar");
const Preloader = require("./components/Preloader");

const app = document.getElementById("app");
const sidebar = document.getElementById("sidebar");
const progressbar = document.getElementById("progressbar");

const AppRouter = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path={"/"} component={Home} />
                <Route path={"/userlist"} component={UserList} />
                <Route path={"/userlistmanager"} component={UserListManager} />
                <Route path={"/calendar"} component={Calendar} />
            </Router>
        );
    }
});

ReactDOM.render(<AppRouter />, app);
ReactDOM.render(<Sidebar />, sidebar);
ReactDOM.render(<Preloader visibility="hidden" />, progressbar);