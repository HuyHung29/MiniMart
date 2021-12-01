import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { findCategories } from "utils";

function MainPage() {
	const products = useSelector((state) => state.products);
	const categories = useSelector((state) => state.categories);

	const renderProducts = () => {
		return products.map((product, index) => {
			return (
				<tr key={product._id} className='products__item'>
					<th scope='row' className='text-center'>
						{index}
					</th>
					<td className='products__item__image'>
						{product.pictures.map((image, stt) => {
							return (
								<img key={stt} src={image} alt='anh san pham' />
							);
						})}
					</td>
					<td className='products__item__title'>{product.title}</td>
					<td className='products__item__des'>
						{product.description}
					</td>
					<td className='products__item__price text-center'>
						{`${product.price.toLocaleString()} đ/${product.unit}`}
					</td>
					<td className='text-center'>{product.discount + "%"}</td>
					<td className='text-center'>{product.quantity}</td>
					<td className='text-center'>{product.sellNumber}</td>
					<td className='text-center'>
						{findCategories(product.category, categories).name}
					</td>
					<td>
						<Button
							className='products__item__action'
							color='primary'>
							<Link to={`/products/edit/${product._id}`}>
								Sửa
							</Link>
						</Button>
					</td>
					<td>
						<Button
							className='products__item__action'
							color='danger'>
							Xóa
						</Button>
					</td>
				</tr>
			);
		});
	};

	return (
		<Container>
			<Row>
				<Col md='12'>
					<h1 className='text-center my-5'>Danh Sách Sản Phẩm</h1>
					<Table bordered size='xl' className='products'>
						<thead className='products__header'>
							<tr>
								<th>STT</th>
								<th>Ảnh sản phẩm</th>
								<th>Tên sản phẩm</th>
								<th>Mô tả sản phẩm</th>
								<th>Giá</th>
								<th>Khuyến mãi</th>
								<th>Số lượng</th>
								<th>Đã bán</th>
								<th>Phân loại</th>
								<th colSpan='2'></th>
							</tr>
						</thead>
						<tbody className='products__list'>
							{renderProducts()}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
}

export default MainPage;
