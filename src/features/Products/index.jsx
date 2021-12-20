import NotFound from "components/NotFound";
import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useRouteMatch } from "react-router-dom";
import AddEditProduct from "./pages/AddEditProduct";
import MainPage from "./pages/MainPage";
import PropTypes from "prop-types";
import { fetchProducts } from "app/productsSlice";
import { useDispatch } from "react-redux";
import qs from "query-string";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";

Products.propTypes = {
	role: PropTypes.string.isRequired,
};

function Products({ role }) {
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const location = useLocation();

	const [pagination, setPagination] = useState({});
	const [loading, setLoading] = useState(false);

	const { page, sort, field, search, limit } = qs.parse(location.search);

	const [filter, setFilter] = useState({
		page: page ? page : 1,
		sort: sort ? sort : "",
		field: field ? field : {},
		search: search ? search : "",
		limit: limit ? limit : 5,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setFilter((e) => ({
			...e,
			page: page ? page : 1,
			sort: sort ? sort : "",
			field: field ? field : {},
			search: search ? search : "",
			limit: limit ? limit : 5,
		}));
	}, [page, sort, field, search, limit]);

	useEffect(() => {
		const fetchProductWithFilter = async () => {
			try {
				setLoading(true);
				const response = await dispatch(fetchProducts(filter));
				unwrapResult(response);
				setPagination(response.payload.pagination);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		};

		fetchProductWithFilter();
	}, [dispatch, filter]);

	return (
		<Switch>
			<Route exact path={`${match.url}`}>
				{role === "admin" ? (
					<MainPage pagination={pagination} loading={loading} />
				) : (
					""
				)}
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
