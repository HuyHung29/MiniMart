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
			<Route exact path={`${match.url}`}>
				{isLogin ? (
					<Redirect to={`${match.url}/profile`} />
				) : (
					<Redirect to={`${match.url}/login`} />
				)}
			</Route>
			<Route path={`${match.url}/register`}>
				{isLogin ? <Redirect to={`${match.url}`} /> : <Register />}
			</Route>
			<Route path={`${match.url}/login`}>
				{isLogin ? <Redirect to={`${match.url}`} /> : <Login />}
			</Route>
			<Route path={`${match.url}/profile`}>
				{isLogin ? (
					<MainPage>
						<Profile key='profile' />
					</MainPage>
				) : (
					<Redirect to={`${match.url}`} />
				)}
			</Route>
			<Route path={`${match.url}/address`}>
				{isLogin ? (
					<MainPage>
						<Address key='address' />
					</MainPage>
				) : (
					<Redirect to={`${match.url}`} />
				)}
			</Route>
			<Route path={`${match.url}/password`}>
				{isLogin ? (
					<MainPage>
						<Password />
					</MainPage>
				) : (
					<Redirect to={`${match.url}`} />
				)}
			</Route>
		</Switch>
	);
}

export default User;
