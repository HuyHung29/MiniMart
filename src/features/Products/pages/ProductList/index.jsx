import Loading from "components/Loading";
import Pagination from "components/Pagination";
import SubMenu from "components/SubMenu";
import ListProducts from "features/Products/components/ListProducts";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Container, Input, Label, Row } from "reactstrap";

ProductList.propTypes = {
	pagination: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
};

function ProductList({ pagination, loading }) {
	const location = useLocation();
	const products = useSelector((state) => state.products.listProduct);

	return (
		<Container className='product-list--wrap'>
			<Row>
				<Col md='2'>
					<h3 className='product-list__title'>Danh mục sản phẩm</h3>
					<SubMenu />
					<h3 className='product-list__title'>Tìm theo giá</h3>
					<ul className='sort-price'>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-1' />
							<Label for='price-1'>
								Giá dưới 100.000<sup>đ</sup>
							</Label>
						</li>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-2' />
							<Label for='price-2'>
								100.000<sup>đ</sup> - 200.000<sup>đ</sup>
							</Label>
						</li>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-3' />
							<Label for='price-3'>
								200.000<sup>đ</sup> - 300.000<sup>đ</sup>
							</Label>
						</li>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-4' />
							<Label for='price-4'>
								300.000<sup>đ</sup> - 500.000<sup>đ</sup>
							</Label>
						</li>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-5' />
							<Label for='price-5'>
								200.000<sup>đ</sup> - 1.000.000<sup>đ</sup>
							</Label>
						</li>
						<li className='sort-price__item'>
							<Input type='radio' name='price' id='price-6' />
							<Label for='price-6'>
								Giá trên 1.000.000<sup>đ</sup>
							</Label>
						</li>
					</ul>
				</Col>
				{loading ? (
					<Loading />
				) : (
					<Col>
						<h3 className='product-list__title'>Tất cả sản phẩm</h3>
						<ListProducts products={products} />
						<Pagination
							pagination={pagination}
							location={location}
						/>
					</Col>
				)}
			</Row>
		</Container>
	);
}

export default ProductList;