import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Address from "./components/Address";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Login from "./pages/Login";
import MainPage from "./pages/Main";
import Register from "./pages/Register";

function User() {
	const { isLogin } = useSelector((state) => state.users);
	const match = useRouteMatch();

	return (
		<Switch>
			{isLogin ? (
				<Switch>
					<Route exact path={`${match.url}`}>
						<Redirect to={`${match.url}/profile`} />
					</Route>
					<Route path={`${match.url}/register`}>
						<Redirect to={`${match.url}`} />
					</Route>
					<Route path={`${match.url}/login`}>
						<Redirect to={`${match.url}`} />
					</Route>
					<Route path={`${match.url}/profile`}>
						<MainPage>
							<Profile key='profile' />
						</MainPage>
					</Route>
					<Route path={`${match.url}/address`}>
						<MainPage>
							<Address key='address' />
						</MainPage>
					</Route>
					<Route path={`${match.url}/password`}>
						<MainPage>
							<Password />
						</MainPage>
					</Route>
				</Switch>
			) : (
				<Switch>
					<Route path={`${match.url}/register`}>
						<Register />
					</Route>
					<Route path={`${match.url}/login`}>
						<Login />
					</Route>
					<Route>
						<Redirect to={`${match.url}/login`} />
					</Route>
				</Switch>
			)}
		</Switch>
	);
}

export default User;
