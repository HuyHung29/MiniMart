import { unwrapResult } from "@reduxjs/toolkit";
import { createProduct, updateProduct } from "app/productsSlice";
import AddEditForm from "components/AddEditForm";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import * as yup from "yup";

function AddEditProduct() {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const { productId } = useParams();
	const history = useHistory();
	const editProduct = useSelector((state) =>
		state.products.find((product) => product._id === productId)
	);

	const isEdit = !!productId;

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
			country: yup.string().required("Vui lòng nhập trường này"),
			unit: yup.string().required("Vui lòng nhập trường này"),
			category: yup.string().required("Vui lòng nhập trường này"),
		})
		.required();

	const defaultValues =
		isEdit && !!editProduct
			? {
					title: editProduct.title,
					price: editProduct.price,
					discount: editProduct.discount,
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
					country: "",
					unit: "",
					category: "",
					pictures: "",
					description: "",
			  };

	const onSubmit = (data) => {
		console.log(data);
		const formData = new FormData();

		for (let key in data) {
			if (key === "pictures" && data[key] !== "") {
				formData.append(key, data[key][0]);
			} else formData.append(key, data[key]);
		}

		const fetchAddEditProduct = async () => {
			let action = "";
			if (isEdit) {
				action = updateProduct({ productId, formData });
			} else {
				action = createProduct(formData);
			}
			try {
				const response = await dispatch(action);
				unwrapResult(response);
				history.push("/products");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(fetchAddEditProduct, {
			pending: "Đang xử lý",
			success: isEdit
				? "Cập nhật thành công"
				: "Thêm sản phẩm thành công",
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
						{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
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
