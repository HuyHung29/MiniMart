import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditProduct from "./pages/AddEditProduct";
import MainPage from "./pages/MainPage";

function Products() {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path={`${match.url}`} component={MainPage} />
			<Route path={`${match.url}/add`} component={AddEditProduct} />
			<Route path={`${match.url}/edit/:id`} component={AddEditProduct} />
			<Route path={`${match.url}/:id`} />
			<Route component={NotFound} />
		</Switch>
	);
}

export default Products;
