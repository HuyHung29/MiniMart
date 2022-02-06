import AddEditForm from "components/AddEditForm";
import React from "react";
import * as yup from "yup";
import { Col, Container, Row } from "reactstrap";

const schema = yup.object({
	name: yup.string().required("Vui lòng nhập tên danh mục"),
});

function AddCategories() {
	const defaultValues = {
		name: "",
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Container>
			<Row>
				<Col className='bg-white shadow-sm p-5'>
					<div className='add-edit__header'>
						<h1 className='add-edit__heading'>
							Thêm 1 danh mục mới
						</h1>
						<p className='add-edit__sub-heading'>
							Vui lòng điền thông tin danh mục
						</p>
					</div>
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						onSubmit={onSubmit}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default AddCategories;
