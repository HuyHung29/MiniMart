import ListItem from "components/ListItem";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function Categories() {
	const location = useLocation();
	const categories = useSelector((state) => state.categories);

	const handleDeleteItem = () => {};
	const handleDeleteSelectedItem = () => {};

	return (
		<Container>
			<Row>
				<Col>
					{categories.length !== 0 && (
						<ListItem
							categoryList={categories}
							handleDeleteItem={handleDeleteItem}
							handleDeleteSelectedItem={handleDeleteSelectedItem}
							location={location}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Categories;
