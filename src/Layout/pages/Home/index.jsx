import Footer from "components/Footer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import Products from "features/Products";
import CartMainPage from "features/Purchase/page/CartMainPage";
import User from "features/User";
import HomePage from "Layout/components/HomePage";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

function Home() {
	const isLogin = useSelector((state) => state.users.isLogin);

	return (
		<div className='layout__content__background'>
			<Header />
			<NavBar />
			<Switch>
				<Route path='/' exact component={HomePage} />
				<Route path='/user' component={User} />
				<Route path='/products' component={Products} />

				<Route path='/cart'>
					{isLogin ? <CartMainPage /> : <Redirect to='/user/login' />}
				</Route>

				<Route component={NotFound} />
			</Switch>
			<Footer />
		</div>
	);
}

export default Home;
