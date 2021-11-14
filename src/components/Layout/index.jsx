import Footer from "components/Layout/components/Footer";
import Header from "components/Layout/components/Header";
import Loading from "components/Loading";
import NavBar from "components/NavBar";
import NotFound from "components/NotFound";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const User = React.lazy(() => import("features/User"));
const Products = React.lazy(() => import("features/Products"));

function Layout() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<div className='Layout'>
					<Header />
					<NavBar />
					<div className='layout__content__background'>
						<Switch>
							<Route path='/user' component={User} />
							<Route path='/products' component={Products} />
							<Route component={NotFound} />
						</Switch>
					</div>
					<Footer />
					<ToastContainer />
				</div>
			</Suspense>
		</Router>
	);
}

export default Layout;
