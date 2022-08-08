import { fetchProductsByCate } from "app/productsSlice";
import Pagination from "components/Pagination";
import SubMenu from "components/SubMenu";
import ListProducts from "features/Products/components/ListProducts";
import qs from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Col, Container, Input, Label, Row } from "reactstrap";

function ProductList() {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const products = useSelector((state) => state.products.listProduct);
	const categories = useSelector((state) => state.categories);

	const { id, ...rest } = qs.parse(location.search);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductsByCate(id));
		}
	}, [dispatch, id]);

	return (
		<Container className='product-list--wrap'>
			<Row>
				<Col md='2'>
					<h3 className='product-list__title'>Danh mục sản phẩm</h3>
					<SubMenu />
					<h3 className='product-list__title'>Tìm theo giá</h3>
					{location.pathname.includes("category") ? (
						<></>
					) : (
						<ul className='sort-price'>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									onChange={() =>
										history.push(
											"/product?price[lt]=100000"
										)
									}
									checked={rest["price[lt]"] === "100000"}
								/>
								<Label for='price-1'>
									<Link to='/products?price[lt]=100000'>
										Giá dưới 100.000<sup>đ</sup>
									</Link>
								</Label>
							</li>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									id='price-2'
									onChange={() =>
										history.push(
											"?price[gte]=100000&price[lte]=200000"
										)
									}
									checked={
										rest["price[lt]"] === "200000" &&
										rest["price[gte]"] === "100000"
									}
								/>
								<Label for='price-2'>
									<Link to='?price[gte]=100000&price[lt]=200000'>
										100.000<sup>đ</sup> - 200.000
										<sup>đ</sup>
									</Link>
								</Label>
							</li>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									id='price-3'
									onChange={() =>
										history.push(
											"?price[gte]=200000&price[lte]=300000"
										)
									}
									checked={
										rest["price[lt]"] === "300000" &&
										rest["price[gte]"] === "200000"
									}
								/>
								<Label for='price-3'>
									<Link to='?price[gte]=200000&price[lt]=300000'>
										200.000<sup>đ</sup> - 300.000
										<sup>đ</sup>
									</Link>
								</Label>
							</li>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									id='price-4'
									onChange={() =>
										history.push(
											"?price[gte]=300000&price[lte]=500000"
										)
									}
									checked={
										rest["price[lt]"] === "500000" &&
										rest["price[gte]"] === "300000"
									}
								/>
								<Label for='price-4'>
									<Link to='?price[gte]=300000&price[lt]=500000'>
										300.000<sup>đ</sup> - 500.000
										<sup>đ</sup>
									</Link>
								</Label>
							</li>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									id='price-5'
									onChange={() =>
										history.push(
											"?price[gte]=500000&price[lte]=1000000"
										)
									}
									checked={
										rest["price[lt]"] === "1000000" &&
										rest["price[gte]"] === "500000"
									}
								/>
								<Label for='price-5'>
									<Link to='?price[gte]=500000&price[lt]=1000000'>
										500.000<sup>đ</sup> - 1.000.000
										<sup>đ</sup>
									</Link>
								</Label>
							</li>
							<li className='sort-price__item'>
								<Input
									value='0'
									type='radio'
									name='price'
									id='price-6'
									onChange={() =>
										history.push("?price[gt]=1000000")
									}
									checked={rest["price[gt]"] === "1000000"}
								/>
								<Label for='price-6'>
									<Link to='?price[gt]=1000000'>
										Giá trên 1.000.000<sup>đ</sup>
									</Link>
								</Label>
							</li>
						</ul>
					)}
				</Col>
				<Col>
					<h3 className='product-list__title'>
						{id
							? categories.find((cate) => cate._id === id)?.name
							: "Tất cả sản phẩm"}
					</h3>
					<ListProducts products={products} />
					{!id ? <Pagination location={location} /> : <></>}
				</Col>
			</Row>
		</Container>
	);
}

export default ProductList;
