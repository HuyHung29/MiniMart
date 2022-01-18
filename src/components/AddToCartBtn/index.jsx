import { addToCart } from "app/purchaseSlide";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

AddToCartBtn.propTypes = {
	absolute: PropTypes.bool,
	product: PropTypes.object.isRequired,
	quantity: PropTypes.number,
	onClose: PropTypes.func,
};

AddToCartBtn.defaultProps = {
	absolute: false,
	quantity: 1,
};

function AddToCartBtn({ absolute, product, quantity, onClose }) {
	const dispatch = useDispatch();
	const { _id: id, title, pictures, price, discount } = product;
	const isInCart = !!useSelector((state) =>
		state.purchase.cart.find((item) => item.id === id)
	);

	const productCart = {
		id,
		name: title,
		picture: pictures[0],
		price: price - price * (discount / 100),
		quantity,
	};

	const onClosePreview = () => {
		if (onClose) onClose();
	};

	const onAddToCart = () => {
		dispatch(addToCart(productCart));
		onClosePreview();
		toast.success("Thêm sản phẩm thành công!!!");
	};

	const renderBtn = () => {
		return isInCart ? (
			<Button className='add-cart-btn shadow-none'>Tùy chọn</Button>
		) : (
			<Button className='add-cart-btn shadow-none' onClick={onAddToCart}>
				Thêm vào giỏ hàng
			</Button>
		);
	};
	return (
		<>
			{absolute ? (
				<div className='add-cart-btn--wrap'>{renderBtn()}</div>
			) : (
				<>{renderBtn()}</>
			)}
		</>
	);
}

export default AddToCartBtn;
