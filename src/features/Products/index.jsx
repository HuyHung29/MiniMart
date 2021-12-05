import NotFound from "components/NotFound";
import React from "react";
import { Route, Redirect, Switch, useRouteMatch } from "react-router-dom";
import AddEditProduct from "./pages/AddEditProduct";
import MainPage from "./pages/MainPage";
import PropTypes from "prop-types";

Products.propTypes = {
	role: PropTypes.string.isRequired,
};

function Products({ role }) {
	const match = useRouteMatch();

	return (
		<Switch>
			<Route exact path={`${match.url}`}>
				{role === "admin" ? <MainPage /> : ""}
			</Route>
			{role === "admin" ? (
				<Switch>
					<Route
						path={`${match.url}/add`}
						component={AddEditProduct}
					/>
					<Route
						path={`${match.url}/edit/:productId`}
						component={AddEditProduct}
					/>
					<Route path={`${match.url}/:productId`} />
				</Switch>
			) : (
				<Redirect to='/' />
			)}

			<Route component={NotFound} />
		</Switch>
	);
}

export default Products;
