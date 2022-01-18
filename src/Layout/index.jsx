import { unwrapResult } from "@reduxjs/toolkit";
import { fetchCategories } from "app/categoriesSlice";
import { fetchUserInfo, userLogout } from "app/userSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import ScrollToTop from "components/ScrollToTop";
import ProductPreview from "features/Products/components/ProductPreview";
import CartMainPage from "features/Purchase/page/CartMainPage";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
				<ScrollToTop />
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
							{loginStatus ? (
								<Route to='/cart' component={CartMainPage} />
							) : (
								<Redirect to='/user/login' />
							)}
							<Route component={NotFound} />
						</Switch>
					</div>
					<Loading />
					<ProductPreview />
					<Footer />
					<ToastContainer autoClose={2000} />
				</div>
			</Suspense>
		</Router>
	);
}

export default Layout;
