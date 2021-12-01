import { unwrapResult } from "@reduxjs/toolkit";
import { createProduct } from "app/productsSlice";
import AddEditForm from "components/AddEditForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";

function AddEditProduct() {
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	const { productId } = useParams();
	const editProduct = useSelector((state) =>
		state.products.find((product) => product._id === productId)
	);
	const idEdit = !!productId;

	const schema = yup
		.object({
			title: yup.string().required("Vui lòng nhập trường này"),
			description: yup.string().required("Vui lòng nhập trường này"),
			pictures: yup
				.mixed()
				.test("fileSize", "The file is too large", (value) => {
					if (!value.length) return true; // attachment is optional
					return value[0].size <= 2000000;
				})
				.required("CHọn ảnh cho sản phẩm"),
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

	const defaultValues = idEdit
		? {
				title: editProduct.title,
				price: editProduct.price,
				discount: editProduct.discount,
				quantity: editProduct.quantity,
				country: editProduct.country,
				unit: editProduct.unit,
				category: editProduct.category,
				pictures: "",
				description: editProduct.description,
		  }
		: {
				title: "",
				price: "",
				discount: "",
				quantity: "",
				country: "",
				unit: "",
				category: "",
				pictures: "",
				description: "",
		  };

	const onSubmit = (data) => {
		const formData = new FormData();

		for (let key in data) {
			if (key === "pictures") {
				formData.append(key, data[key][0]);
			} else formData.append(key, data[key]);
		}
		const fetchCreateProduct = async () => {
			try {
				const response = await dispatch(createProduct(formData));
				unwrapResult(response);
			} catch (error) {
				throw error;
			}
		};

		toast.promise(fetchCreateProduct, {
			pending: "Đang xử lý",
			success: "Thêm sản phẩm thành công",
			error: {
				render({ data }) {
					return data.message;
				},
			},
		});
	};

	return (
		<Container>
			<Row>
				<Col />
				<Col md='8'>
					<h2 className='add-edit-page text-center my-5'>
						Thêm sản phẩm
					</h2>
					<AddEditForm
						schema={schema}
						defaultValues={defaultValues}
						categories={categories}
						onSubmit={onSubmit}
						editProduct={editProduct ? editProduct : undefined}
					/>
				</Col>
				<Col />
			</Row>
		</Container>
	);
}

export default AddEditProduct;
