import AddEditForm from "components/AddEditForm";
import React from "react";
import * as yup from "yup";
import { Col, Container, Row } from "reactstrap";

const schema = yup.object({
	name: yup.string().required("Vui lòng nhập tên danh mục"),
});

function AddCategoriesPage() {
	const defaultValues = {
		name: "",
	};
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Container>
			<Row>
				<Col />
				<Col md='8'>
					<h2 className='add-edit-page text-center my-5'>
						"Thêm danh mục"
					</h2>
					<AddEditForm
						onSubmit={onSubmit}
						defaultValues={defaultValues}
						schema={schema}
					/>
				</Col>
				<Col />
			</Row>
		</Container>
	);
}

export default AddCategoriesPage;
