import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFromCart, updateCart } from "app/purchaseSlide";

CartPageItem.propTypes = {
	item: PropTypes.object.isRequired,
	handleCheck: PropTypes.func.isRequired,
	checkList: PropTypes.array.isRequired,
};

function CartPageItem({ item, handleCheck, checkList }) {
	const dispatch = useDispatch();
	const { _id, title, price, quantity, pictures } = item;

	const onDeleteFromCart = () => {
		dispatch(deleteFromCart(_id));
	};

	const onUpdateCartPlus = () => {
		const newQuantity = quantity + 1;
		dispatch(updateCart({ id: _id, newQuantity }));
	};

	const onUpdateCartMinus = () => {
		const newQuantity = quantity > 0 ? quantity - 1 : 0;
		dispatch(updateCart({ id: _id, newQuantity }));
	};

	const onUpdateCartTyping = (e) => {
		const target = e.target;
		const value = +target.value;
		if (value === 0) {
			const newQuantity = 0;
			dispatch(updateCart({ id: _id, newQuantity }));
		} else if (value && value < 999) {
			const newQuantity = value;
			dispatch(updateCart({ id: _id, newQuantity }));
			e.target.value = newQuantity;
		}
	};

	return (
		<div className='cart-page__item'>
			<div className='cart-page__item__checkbox'>
				<input
					type='checkbox'
					name='checkbox'
					value={_id}
					onChange={handleCheck}
					checked={checkList.includes(_id)}
				/>
			</div>
			<div className='cart-page__item__product'>
				<Link to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}>
					<img src={pictures[0]} alt='anh' />
				</Link>
				<Link to={`/products/${title.replaceAll(" ", "-")}?id=${_id}`}>
					<p>{title}</p>
				</Link>
			</div>
			<div className='cart-page__item__price'>
				<p>
					{price.toLocaleString()}
					<sup>đ</sup>
				</p>
			</div>
			<div className='cart-page__item__quantity'>
				<div className='cart-page__item__quantity__calculate'>
					<p onClick={onUpdateCartMinus}>
						<i className='fas fa-minus'></i>
					</p>
					<input
						type='number'
						value={quantity || 0}
						onBlur={(e) => {
							if (+e.target.value === 0) {
								const newQuantity = 1;
								dispatch(updateCart({ id: _id, newQuantity }));
							}
						}}
						onChange={onUpdateCartTyping}
					/>
					<p onClick={onUpdateCartPlus}>
						<i className='fas fa-plus'></i>
					</p>
				</div>
			</div>
			<div className='cart-page__item__total'>
				<p>
					{(price * quantity).toLocaleString()}
					<sup>đ</sup>
				</p>
			</div>
			<div className='cart-page__item__action'>
				<p>
					<i className='fas fa-times' onClick={onDeleteFromCart}></i>
				</p>
			</div>
		</div>
	);
}

export default CartPageItem;
