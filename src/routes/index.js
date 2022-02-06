import NotFound from "components/NotFound";
import CategoriesPosts from "features/Other";
import AddCategories from "features/Other/page/AddCategories";
import AddEditPosts from "features/Other/page/AddEditPosts";
import Categories from "features/Other/page/Categories";
import Posts from "features/Other/page/Posts";
import Products from "features/Products";
import AddEditProduct from "features/Products/pages/AddEditProduct";
import AdminProductPage from "features/Products/pages/AdminProductPage";
import ProductDetail from "features/Products/pages/ProductDetail";
import ProductList from "features/Products/pages/ProductList";
import User from "features/User";
import Address from "features/User/components/Address";
import Password from "features/User/components/Password";
import Profile from "features/User/components/Profile";
import Login from "features/User/pages/Login";
import MainPage from "features/User/pages/Main";
import Register from "features/User/pages/Register";
import AdminHomePage from "Layout/components/AdminHomePage";
import HomePage from "Layout/components/HomePage";
import Admin from "Layout/pages/Admin";
import React from "react";
import { Redirect } from "react-router-dom";

export const adminRoutes = [
	{
		path: "/",
		exact: true,
		common: true,
		component: HomePage,
	},
	{
		path: "/products",
		component: Products,
		common: true,
		routes: [
			{
				path: "/products",
				exact: true,
				component: ProductList,
			},
			{
				path: "/products/:productId",
				component: ProductDetail,
			},
		],
	},
	{
		path: "/admin",
		component: Admin,
		routes: [
			{
				path: "/admin",
				exact: true,
				component: AdminHomePage,
			},
			{
				path: "/admin/products",
				component: Products,
				routes: [
					{
						path: "/admin/products",
						exact: true,
						component: AdminProductPage,
					},
					{
						path: "/admin/products/add",
						component: AddEditProduct,
					},
					{
						path: "/admin/products/edit/:editProductId",
						component: AddEditProduct,
					},
				],
			},
			{
				path: "/admin/posts",
				component: CategoriesPosts,
				routes: [
					{
						path: "/admin/posts",
						exact: true,
						component: Posts,
					},
					{
						path: "/admin/posts/add",
						component: AddEditPosts,
					},
					{
						path: "/admin/posts/edit/:editPostId",
						component: AddEditPosts,
					},
				],
			},
			{
				path: "/admin/categories",
				component: CategoriesPosts,
				routes: [
					{
						path: "/admin/categories",
						exact: true,
						component: Categories,
					},
					{
						path: "/admin/categories/add",
						component: AddCategories,
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
			{
				path: "/admin/password",
				component: Password,
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
		component: User,
		routes: [
			{
				path: "/user",
				exact: true,
				component: () => <Redirect to='/user/profile' />,
			},
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
				component: () => (
					<MainPage>
						<Profile />
					</MainPage>
				),
			},
			{
				path: "/user/address",
				component: () => (
					<MainPage>
						<Address />
					</MainPage>
				),
			},
			{
				path: "/user/password",
				component: () => (
					<MainPage>
						<Password />
					</MainPage>
				),
			},
		],
	},
	{
		path: "/products",
		component: Products,
		routes: [
			{
				path: "/products",
				exact: true,
				component: ProductList,
			},
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

export const guestRoutes = [
	{
		path: "/",
		exact: true,
		component: HomePage,
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
		component: Products,
		routes: [
			{
				path: "/products",
				exact: true,
				component: ProductList,
			},
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
