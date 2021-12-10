import { unwrapResult } from "@reduxjs/toolkit";
import { fetchCategories } from "app/categoriesSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import { fetchUserInfo, userLogout } from "app/userSlice";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchProducts } from "app/productsSlice";

const Home = React.lazy(() => import("./pages/Home"));
const User = React.lazy(() => import("features/User"));
const Products = React.lazy(() => import("features/Products"));

function Layout() {
	const { user, isLogin, accessToken } = useSelector((state) => state.users);
	const { role } = user;
	const [loginStatus, setLoginStatus] = useState(isLogin);
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();

	useEffect(() => {
		const getNeededInfo = async () => {
			try {
				const categories = await dispatch(fetchCategories());
				unwrapResult(categories);
				const products = await dispatch(fetchProducts());
				unwrapResult(products);
			} catch (error) {
				throw error;
			}
		};

		getNeededInfo();
	}, [dispatch]);

	useEffect(() => {
		setLoginStatus(isLogin);
	}, [isLogin]);

	useEffect(() => {
		if (isLogin || accessToken) dispatch(fetchUserInfo());
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
							<Route path='/products'>
								<Products role={role} />
							</Route>
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
