import { unwrapResult } from "@reduxjs/toolkit";
import { fetchCategories } from "app/categoriesSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import { fetchUserInfo, userLogout } from "features/User/userSlice";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = React.lazy(() => import("./pages/Home"));
const User = React.lazy(() => import("features/User"));
const Products = React.lazy(() => import("features/Products"));

function Layout() {
	const { user, isLogin, accessToken } = useSelector((state) => state.users);
	const [loginStatus, setLoginStatus] = useState(isLogin);
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategories = async () => {
			try {
				const response = await dispatch(fetchCategories());
				unwrapResult(response);
			} catch (error) {
				throw error;
			}
		};

		getCategories();
	}, [dispatch]);

	useEffect(() => {
		setLoginStatus(isLogin);
	}, [isLogin]);

	useEffect(() => {
		if (isLogin && accessToken) dispatch(fetchUserInfo());
	}, [dispatch, isLogin, accessToken]);

	const logout = () => {
		dispatch(userLogout(false));
		localStorage.clear();
	};

	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<div className='Layout'>
					<Header
						isLogin={loginStatus}
						userName={user.name}
						logout={logout}
					/>
					<NavBar categories={categories} />
					<div className='layout__content__background'>
						<Switch>
							<Route path='/' exact component={Home} />
							<Route path='/user' component={User} />
							<Route path='/products' component={Products} />
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
					<ToastContainer autoClose={3000} />
				</div>
			</Suspense>
		</Router>
	);
}

export default Layout;
