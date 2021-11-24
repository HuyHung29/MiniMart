import AddEditForm from "components/AddEditForm";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";

function AddEditProduct() {
	const categories = useSelector((state) => state.categories);

	const schema = yup
		.object({
			title: yup.string().required("Vui lòng nhập trường này"),
			description: yup.string().required("Vui lòng nhập trường này"),
			pictures: yup.string(),
			price: yup
				.number()
				.min(0, "Giá phải là số dương")
				.required("Vui lòng nhập trường này"),
			discount: yup
				.number()
				.min(0, "Giá phải là số dương")
				.required("Vui lòng nhập trường này"),
			quantity: yup
				.number()
				.min(0, "Giá phải là số dương")
				.required("Vui lòng nhập trường này"),
			country: yup.string().required("Vui lòng nhập trường này"),
			unit: yup.string().required("Vui lòng nhập trường này"),
			category: yup.string().required("Vui lòng nhập trường này"),
		})
		.required();

	const defaultValues = {
		title: "",
		description: "",
		pictures: [],
		price: 0,
		discount: 0,
		quantity: 0,
		country: "",
		unit: "",
		category: "",
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Container>
			<Row>
				<Col
					md={{
						offset: 4,
						size: 4,
					}}>
					<h2 className='add-edit-page text-center my-5'>
						Thêm sản phẩm
					</h2>
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						categories={categories}
						onSubmit={onSubmit}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default AddEditProduct;
