import HeaderAdmin from "components/HeaderAdmin";
import NavBarAdmin from "components/NavBarAdmin";
import NotFound from "components/NotFound";
import CategoriesPosts from "features/Other";
import Products from "features/Products";
import User from "features/User";
import AdminHomePage from "Layout/components/AdminHomePage";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function Admin() {
	const { path } = useRouteMatch();

	return (
		<Container fluid className='admin'>
			<Row>
				<HeaderAdmin />
			</Row>
			<Row className='admin__content'>
				<Col md='2' className='admin__side'>
					<NavBarAdmin />
				</Col>
				<Col className='admin__has-side'>
					<Switch>
						<Route path={path} exact component={AdminHomePage} />
						<Route path={path + "/products"} component={Products} />
						<Route
							path={path + "/categories"}
							component={CategoriesPosts}
						/>
						<Route
							path={path + "/posts"}
							component={CategoriesPosts}
						/>
						<Route path={path + "/info"} component={User} />
						<Route path={path + "/address"} component={User} />
						<Route component={NotFound} />
					</Switch>
				</Col>
			</Row>
		</Container>
	);
}

export default Admin;
