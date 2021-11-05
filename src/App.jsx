import Footer from "components/Footer";
import Header from "components/Header";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import Products from "features/Products";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const User = React.lazy(() => import("features/User"));

function App() {
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<div className='App'>
					<Header />
					<Switch>
						<Route path='/user' component={User} />
						<Route path='/products' component={Products} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</div>
			</Suspense>
		</Router>
	);
}

export default App;
