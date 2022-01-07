import ImageSlider from "components/ImageSlider";
import ReadMore from "components/ReadMore";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Button } from "reactstrap";

ProductPreview.propTypes = {
	product: PropTypes.object.isRequired,
	isShow: PropTypes.bool.isRequired,
	setIsShowModal: PropTypes.func.isRequired,
};

ProductPreview.defaultProps = {
	product: {},
	isShow: false,
};

function ProductPreview({ product, isShow, setIsShowModal }) {
	const modalRef = useRef();
	const [quantity, setQuantity] = useState(1);

	const productCurrentPrice = (
		product.price -
		product.price * (product.discount / 100)
	).toLocaleString();

	const closeModal = () => {
		setIsShowModal(false);
	};

	return (
		<>
			{isShow ? (
				<div
					className='product-preview--wrap'
					ref={modalRef}
					onClick={(e) => {
						if (modalRef.current === e.target) {
							closeModal();
						}
					}}>
					<div className='product-preview'>
						<div className='product-preview__pictures'>
							<ImageSlider
								dots={false}
								infinite={false}
								slidesToShow={4}
								slidesToScroll={4}
								pictures={product.pictures}
							/>
						</div>

						<div className='product-preview__content'>
							<h1 className='product-preview__name'>
								{product.title}
							</h1>
							<p className='product-preview__origin'>
								Xuất sứ: <span>{product.country}</span>
							</p>
							<div className='product-preview__price--wrap'>
								<p className='product-preview__price'>
									{productCurrentPrice}
									<sup>đ</sup>
								</p>
								<p className='product-preview__price--old'>
									{product.price.toLocaleString()}
									<sup>đ</sup>
								</p>
							</div>
							<ReadMore row={4} readMore={false}>
								{product.description}
							</ReadMore>
							<div className='product-preview__quantity'>
								<p
									className='product-preview__quantity__btn'
									onClick={() => {
										if (quantity > 1) {
											setQuantity(
												(quantity) => +quantity - 1
											);
										}
									}}>
									<i className='fas fa-minus'></i>
								</p>
								<input
									onBlur={(e) => {
										if (+e.target.value === 0) {
											setQuantity(1);
										}
									}}
									type='text'
									value={quantity ? quantity : ""}
									name='value'
									className='product-preview__quantity__value'
									onChange={(e) => {
										if (+e.target.value === 0) {
											setQuantity("");
										} else if (+e.target.value < 999) {
											setQuantity(+e.target.value);
										}
									}}
								/>
								<p
									className='product-preview__quantity__btn'
									onClick={() => {
										setQuantity(
											(quantity) => +quantity + 1
										);
									}}>
									<i className='fas fa-plus'></i>
								</p>
							</div>
							<div className='text-center'>
								<Button className='product-preview__btn shadow-none'>
									Thêm vào giỏ hàng
								</Button>
							</div>
						</div>
						<p
							className='close-btn'
							onClick={() => {
								closeModal();
							}}>
							<i className='fas fa-times'></i>
						</p>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
}

export default ProductPreview;
