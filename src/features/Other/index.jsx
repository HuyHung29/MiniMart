import NotFound from "components/NotFound";
import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCategoriesPage from "./page/AddEditCategories";
import Categories from "./page/Categories";
import Posts from "./page/Posts";

function CategoriesPosts() {
	return (
		<Switch>
			<Route path='/admin/categories' exact component={Categories} />
			<Route path='/admin/categories/add' component={AddCategoriesPage} />
			<Route path='/admin/posts' exact component={Posts} />
			<Route path='/admin/posts/add' component={AddCategoriesPage} />
			<Route
				path='/admin/posts/edit/:editPostId'
				component={AddCategoriesPage}
			/>
			<Route component={NotFound} />
		</Switch>
	);
}

export default CategoriesPosts;
