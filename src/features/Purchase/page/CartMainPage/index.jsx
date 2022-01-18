import { deleteMultiFromCart } from "app/purchaseSlide";
import BuyBtn from "components/BuyBtn";
import { images } from "constant";
import CartPageItem from "features/Purchase/components/CartPageItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function CartMainPage() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.purchase.cart);
	const [checkList, setCheckList] = useState([]);

	const handleCheck = (e) => {
		const target = e.target;
		const name = e.target.name;
		const value = e.target.value;
		if (target.checked && !checkList.includes(value)) {
			if (name === "checkAll") {
				if (value !== "") {
					const listValue = value.split(",");
					setCheckList([...checkList, ...listValue]);
				}
			} else {
				setCheckList([...checkList, value]);
			}
		} else {
			if (name === "checkAll") setCheckList([]);
			else {
				const index = checkList.findIndex(
					(item) => item === e.target.value
				);
				checkList.splice(index, 1);
				setCheckList([...checkList]);
			}
		}
	};

	const totalPrice = () => {
		return cart.length > 0
			? cart
					.reduce((prev, curr) => {
						return checkList.includes(curr.id)
							? prev + curr.price * curr.quantity
							: prev;
					}, 0)
					.toLocaleString()
			: 0;
	};

	const renderCart = () => {
		return cart.map((item, index) => {
			return (
				<CartPageItem
					item={item}
					key={index}
					handleCheck={handleCheck}
					checkList={checkList}
				/>
			);
		});
	};

	const onDeleteMultiFromCart = () => {
		if (checkList.length > 0) {
			dispatch(deleteMultiFromCart(checkList));
			setCheckList([]);
		}
	};

	return (
		<Container className='cart-page '>
			<Row>
				<Col md='12'>
					{cart.length === 0 ? (
						<div className='cart-page--empty'>
							<img src={images.EMPTYCART} alt='empty' />
							<p>Giỏ hàng của bạn trống</p>
							<Link to='/products' className='btn-normal'>
								Mua ngay
							</Link>
						</div>
					) : (
						<>
							<div className='cart-page__item cart-page--margin bg-white '>
								<div className='cart-page__item__checkbox'>
									<input
										type='checkbox'
										name='checkAll'
										id='checkAll'
										checked={
											cart.length === checkList.length &&
											checkList.length !== 0
										}
										onChange={handleCheck}
										value={cart.map((item) => item.id)}
									/>
								</div>
								<div className='cart-page__item__product'>
									Sản phẩm
								</div>
								<div className='cart-page__item__price'>
									Đơn giá
								</div>
								<div className='cart-page__item__quantity'>
									Số lượng
								</div>
								<div className='cart-page__item__total'>
									Thành tiền
								</div>
								<div className='cart-page__item__action'>
									Thao tác
								</div>
							</div>
							<div className='cart-page__list bg-white'>
								{renderCart()}
							</div>
							<div className='cart-page__item cart-page--margin bg-white '>
								<div className='cart-page__item__checkbox'>
									<input
										type='checkbox'
										name='checkAll'
										id='checkAll'
										onChange={handleCheck}
										checked={
											cart.length === checkList.length &&
											checkList.length !== 0
										}
										value={cart.map((item) => item.id)}
									/>
								</div>
								<div className='cart-page__item__footer-action'>
									<label htmlFor='checkAll'>
										Chọn tất cả ({cart.length})
									</label>
									<p onClick={onDeleteMultiFromCart}>Xóa</p>
									<p className='color'>
										Lưu vào danh sách yêu thích
									</p>
								</div>
								<div className='cart-page__item__summary'>
									<p>
										Tổng thanh toán ({checkList.length} Sản
										phẩm):{" "}
										<span>
											<sup>đ</sup>
											{totalPrice()}
										</span>
									</p>
									<BuyBtn
										content={"Mua hàng"}
										className={"buy-btn--mr0"}
									/>
								</div>
							</div>
						</>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default CartMainPage;
