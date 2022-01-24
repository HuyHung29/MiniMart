import NotFound from "components/NotFound";
import Categories from "features/Other/page/Categories";
import Posts from "features/Other/page/Posts";
import Products from "features/Products";
import ListProducts from "features/Products/components/ListProducts";
import AddEditProduct from "features/Products/pages/AddEditProduct";
import ProductDetail from "features/Products/pages/ProductDetail";
import Address from "features/User/components/Address";
import Password from "features/User/components/Password";
import Profile from "features/User/components/Profile";
import Login from "features/User/pages/Login";
import MainPage from "features/User/pages/Main";
import Register from "features/User/pages/Register";
import HomePage from "Layout/components/HomePage";
import Admin from "Layout/pages/Admin";
import React from "react";
import { Redirect } from "react-router-dom";

export const adminRoutes = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/admin",
		component: Admin,
		routes: [
			{
				path: "/admin/products",
				component: Products,
				routes: [
					{
						path: "/admin/products/add",
						component: AddEditProduct,
					},
					{
						path: "/admin/products/edit/:editProductId",
					},
				],
			},
			{
				path: "/admin/posts",
				component: Posts,
				routes: [
					{
						path: "/admin/posts/add",
						component: AddEditProduct,
					},
					{
						path: "/admin/posts/edit/:editPostId",
					},
				],
			},
			{
				path: "/admin/categories",
				component: Categories,
				routes: [
					{
						path: "/admin/categories/add",
						component: AddEditProduct,
					},
				],
			},
			{
				path: "/admin/info",
				component: Profile,
			},
			{
				path: "/admin/address",
				component: Address,
			},
		],
	},
	{
		path: "/products",
		component: ListProducts,
		routes: [
			{
				path: "/products/:productId",
				component: ProductDetail,
			},
		],
	},
	{
		component: NotFound,
	},
];

export const userRoutes = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/user",
		component: MainPage,
		routes: [
			{
				path: "/user/login",
				component: () => <Redirect to='/user/profile' />,
			},
			{
				path: "/user/register",
				component: () => <Redirect to='/user/profile' />,
			},
			{
				path: "/user/profile",
				component: Profile,
			},
			{
				path: "/user/address",
				component: Address,
			},
			{
				path: "/user/password",
				component: Password,
			},
		],
	},
	{
		path: "/products",
		component: ListProducts,
		routes: [
			{
				path: "/products/:productId",
				component: ProductDetail,
			},
		],
	},
	{
		component: NotFound,
	},
];

export const guestRoute = [
	{
		path: "/",
		exact: true,
		component: HomePage,
	},
	{
		path: "/user",
		exact: true,
		component: () => <Redirect to='/user/login' />,
	},
	{
		path: "/user/login",
		component: Login,
	},
	{
		path: "/user/register",
		component: Register,
	},
	{
		path: "/products",
		component: ListProducts,
		routes: [
			{
				path: "/products/:productId",
				component: ProductDetail,
			},
		],
	},
	{
		path: "/posts",
		component: Posts,
		routes: [
			{
				path: "/posts/:postId",
				component: Posts,
			},
		],
	},
	{
		component: NotFound,
	},
];
