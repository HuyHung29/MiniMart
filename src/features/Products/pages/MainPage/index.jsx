import { unwrapResult } from "@reduxjs/toolkit";
import { deleteMultiProduct, deleteProduct } from "app/productsSlice";
import ListItem from "components/ListItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";

function MainPage() {
	const products = useSelector((state) => state.products.listProduct);
	const categories = useSelector((state) => state.categories);
	const dispatch = useDispatch();
	const match = useRouteMatch();

	// Delete one product
	const handleDeleteProduct = (id) => {
		if (window.confirm("Bạn có chắc muốn xóa sản phẩm này")) {
			const fetchDeleteProduct = async () => {
				try {
					const response = await dispatch(deleteProduct(id));
					unwrapResult(response);
				} catch (error) {
					throw error.message;
				}
			};

			toast.promise(fetchDeleteProduct, {
				pending: "Đang xử lý",
				success: "Xóa sản phẩm thành công",
				error: {
					render: ({ data }) => {
						return data.message;
					},
				},
			});
		}
	};

	// Delete multi product
	const handleDeleteSelectedProduct = (checkList, setCheckList) => {
		const deleteSelectedProduct = async () => {
			try {
				const response = await dispatch(
					deleteMultiProduct({ productIds: [...checkList] })
				);
				unwrapResult(response);
				setCheckList([]);
			} catch (error) {
				console.log(error);
			}
		};

		toast.promise(deleteSelectedProduct, {
			pending: "Đang xử lý",
			success: "Xóa sản phẩm thành công",
			error: {
				render: ({ data }) => {
					return data.message;
				},
			},
		});
	};

	// Render main
	return (
		<Container fluid>
			<Row>
				<Col md='12'>
					<h1 className='text-center my-5'>Danh Sách Sản Phẩm</h1>
					<ListItem
						listItem={products}
						categories={categories}
						url={match.url}
						handleDeleteItem={handleDeleteProduct}
						handleDeleteSelectedItem={handleDeleteSelectedProduct}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default MainPage;
