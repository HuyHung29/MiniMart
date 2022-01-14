import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProducts } from "app/productsSlice";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import AddEditProduct from "./pages/AddEditProduct";
import AdminMainPage from "./pages/AdminMainPage";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";

Products.propTypes = {
	role: PropTypes.string.isRequired,
};

Products.defaultProps = {
	role: "",
};

function Products({ role }) {
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const location = useLocation();

	const [pagination, setPagination] = useState({});
	const [loading, setLoading] = useState(false);

	const { page, sort, search, limit } = qs.parse(location.search);

	const [filter, setFilter] = useState({
		page: page ? page : 1,
		sort: sort ? sort : "",
		search: search ? search : "",
		limit: limit ? limit : 10,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setFilter((e) => ({
			...e,
			page: page ? page : 1,
			sort: sort ? sort : "",
			search: search ? search : "",
			limit: limit ? limit : 10,
		}));
	}, [page, sort, search, limit]);

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
					<AdminMainPage pagination={pagination} loading={loading} />
				) : (
					<ProductList pagination={pagination} loading={loading} />
				)}
			</Route>
			{role === "admin" ? (
				<Switch>
					<Route
						path={`${match.url}/add`}
						component={AddEditProduct}
					/>
					<Route
						path={`${match.url}/edit/:editProductId`}
						component={AddEditProduct}
					/>
				</Switch>
			) : (
				""
			)}

			<Route path={`${match.url}/:productId`} component={ProductDetail} />
		</Switch>
	);
}

export default Products;
