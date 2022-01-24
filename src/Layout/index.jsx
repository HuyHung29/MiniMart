import { fetchCategories } from "app/categoriesSlice";
import { fetchUserInfo } from "app/userSlice";
import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import ScrollToTop from "components/ScrollToTop";
import Products from "features/Products";
import ProductPreview from "features/Products/components/ProductPreview";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage";
import Admin from "./pages/Admin";

const Home = React.lazy(() => import("./pages/Home"));

function Layout() {
	const { user, isLogin, accessToken } = useSelector((state) => state.users);
	const { role } = user;
	const dispatch = useDispatch();

	useEffect(() => {
		const getNeededInfo = async () => {
			try {
				await dispatch(fetchCategories());
			} catch (error) {
				throw error;
			}
		};

		getNeededInfo();
	}, [dispatch]);

	useEffect(() => {
		if (isLogin || accessToken) dispatch(fetchUserInfo());
	}, [dispatch, isLogin, accessToken]);

	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<ScrollToTop />
				<div className='Layout'>
					{role === "admin" ? (
						<>
							<Switch>
								<Route
									path='/'
									exact
									render={() => {
										return (
											<div className='layout__content__background'>
												<Header />
												<NavBar />
												<HomePage />
												<Footer />
											</div>
										);
									}}
								/>
								<Route
									path='/products'
									render={() => {
										return (
											<div className='layout__content__background'>
												<Header />
												<NavBar />
												<Products />
												<Footer />
											</div>
										);
									}}
								/>
								<Route path='/admin' component={Admin} />
								<Route component={NotFound} />
							</Switch>
						</>
					) : (
						<Home />
					)}

					<Loading />
					<ProductPreview />
					<ToastContainer autoClose={2000} />
				</div>
			</Suspense>
		</Router>
	);
}

export default Layout;
