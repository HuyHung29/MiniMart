import cls from "classnames";
import HeaderAdmin from "components/HeaderAdmin";
import NavBarAdmin from "components/NavBarAdmin";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";

function AdminLayout(props) {
	const navbar = useSelector((state) => state.ui.navbar);

	return (
		<Container fluid className='admin'>
			<Row>
				<HeaderAdmin />
			</Row>
			<Row className='admin__content'>
				<Col
					md='2'
					className={cls({
						admin__side: true,
						"d-none": navbar,
					})}>
					<NavBarAdmin />
				</Col>
				<Col
					className={cls({
						"admin__has-side": true,
						"mx-0": navbar,
					})}>
					<Row>
						<Col className='admin__component'>{props.children}</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default AdminLayout;
