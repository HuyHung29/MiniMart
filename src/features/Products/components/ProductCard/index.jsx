import ReadMore from "components/ReadMore";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import ProductPreview from "../ProductPreview";

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
};

function ProductCard({ product, width }) {
	const [isLoved, setIsLoved] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const productCurrentPrice = (
		product.price -
		product.price * (product.discount / 100)
	).toLocaleString();

	const showModal = () => {
		setIsShowModal((prev) => !prev);
	};

	return (
		<Col md={width} className='product-card--wrap'>
			<div className='product-card'>
				<Link
					to={`/products/${product.title.replaceAll(" ", "-")}?id=${
						product._id
					}`}
					className='product-card__link'>
					<div className='product-card__img'>
						<img src={product.pictures[0]} alt='anh' />
					</div>
					<div className='product-card__info'>
						<ReadMore
							className='product-card__name'
							row={1}
							readMore={false}>
							{product.title}
						</ReadMore>

						<div className='product-card__price--wrap'>
							{product.discount > 0 ? (
								<>
									<p className='product-card__price'>
										{productCurrentPrice} <sup>đ</sup>/kg
									</p>
									<p className='product-card__price--old'>
										{product.price.toLocaleString()}{" "}
										<sup>đ</sup>/kg
									</p>
								</>
							) : (
								<p className='product-card__price'>
									{product.price.toLocaleString()}{" "}
									<sup>đ</sup>/kg
								</p>
							)}
						</div>
					</div>
				</Link>
				<p className='product-card__view--btn' onClick={showModal}>
					<i className='fas fa-eye'></i>
				</p>
				<p className='product-card__favorite--btn'>
					{isLoved ? (
						<i
							className='fas fa-heart'
							onClick={() => setIsLoved(!isLoved)}></i>
					) : (
						<i
							className='far fa-heart'
							onClick={() => setIsLoved(!isLoved)}></i>
					)}
				</p>
			</div>
			<ProductPreview
				product={product}
				isShow={isShowModal}
				setIsShowModal={setIsShowModal}
			/>
		</Col>
	);
}

export default ProductCard;
