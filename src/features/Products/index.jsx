import { fetchProducts } from "app/productsSlice";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, useLocation } from "react-router-dom";
import RouteWithSubRoutes from "routes/components/RouteWithSubRoutes";

function Products({ routes }) {
	const dispatch = useDispatch();
	const location = useLocation();

	const { page, sort, limit } = qs.parse(location.search);

	const [filter, setFilter] = useState({
		page: page,
		sort: sort,
		limit: limit || 20,
	});

	useEffect(() => {
		setFilter((prev) => ({
			...prev,
			page: page,
			sort: sort,
			limit: limit || 20,
		}));
	}, [page, sort, limit]);

	useEffect(() => {
		const fetchProductWithFilter = async () => {
			try {
				await dispatch(fetchProducts(filter));
			} catch (error) {
				console.log(error);
			}
		};

		fetchProductWithFilter();
	}, [dispatch, filter]);

	return (
		<Switch>
			{routes.map((route, i) => (
				<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}

export default Products;
