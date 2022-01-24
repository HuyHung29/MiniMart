import { unwrapResult } from "@reduxjs/toolkit";
import { deleteMultiProduct, deleteProduct } from "app/productsSlice";
import ListItem from "components/ListItem";
import Pagination from "components/Pagination";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";

function AdminProductPage() {
	const products = useSelector((state) => state.products.listProduct);
	const dispatch = useDispatch();
	const location = useLocation();

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
		if (
			window.confirm(
				"Bạn có chắn chắn muốn xóa những sản phẩm được chọn ?"
			)
		) {
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
		}
	};

	// Render main
	return (
		<Container fluid>
			<Row>
				<Col md='12'>
					{products.length === 0 ? null : (
						<>
							<ListItem
								productList={products}
								location={location}
								handleDeleteItem={handleDeleteProduct}
								handleDeleteSelectedItem={
									handleDeleteSelectedProduct
								}
							/>
							<Pagination location={location} />
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default AdminProductPage;
