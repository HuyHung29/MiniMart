import { fetchProducts } from "app/productsSlice";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import AddEditProduct from "./pages/AddEditProduct";
import AdminProductPage from "./pages/AdminMainPage";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";

function Products() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { role } = useSelector((state) => state.users.user);

	const { page, sort, search, limit } = qs.parse(location.search);

	const [filter, setFilter] = useState({
		page: page,
		sort: sort,
		search: search,
		limit: limit || 20,
	});

	useEffect(() => {
		setFilter((prev) => ({
			...prev,
			page: page,
			sort: sort,
			search: search,
			limit: limit || 20,
		}));
	}, [page, sort, search, limit]);

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
		<>
			{role === "admin" ? (
				<Switch>
					<Route
						path='/admin/products'
						exact
						component={AdminProductPage}
					/>
					<Route
						path='/admin/products/add'
						component={AddEditProduct}
					/>
					<Route
						path='/admin/products/edit/:editProductId'
						component={AddEditProduct}
					/>
					<Route path='/products' exact component={ProductList} />
					<Route
						path='/products/:productId'
						component={ProductDetail}
					/>
				</Switch>
			) : (
				<Switch>
					<Route path='/products' exact component={ProductList} />
					<Route
						path='/products/:productId'
						component={ProductDetail}
					/>
				</Switch>
			)}
		</>
	);
}

export default Products;
