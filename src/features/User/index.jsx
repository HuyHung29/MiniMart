import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/Main";
import Register from "./pages/Register";

function User() {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path={`${match.url}`} component={MainPage} />
			<Route path={`${match.url}/register`} component={Register} />
			<Route path={`${match.url}/login`} component={Login} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default User;
