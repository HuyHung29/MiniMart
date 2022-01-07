import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

ImageSlider.propTypes = {
	dots: PropTypes.bool,
	infinite: PropTypes.bool,
	slidesToShow: PropTypes.number,
	slidesToScroll: PropTypes.number,
	pictures: PropTypes.array.isRequired,
};

ImageSlider.defaultProps = {
	dots: true,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	pictures: [],
};

function ImageSlider({
	dots,
	infinite,
	slidesToShow,
	slidesToScroll,
	pictures,
	...props
}) {
	const [imgActive, setImgActive] = useState(pictures[0] ? pictures[0] : "");
	const settings = {
		dots: dots,
		infinite: infinite,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToScroll,
	};

	useEffect(() => {
		setImgActive(pictures[0]);
	}, [pictures]);

	const renderPictures = () => {
		return pictures.map((picture, index) => {
			return (
				<div
					key={index}
					className={`image-slider__item ${
						imgActive === picture
							? "image-slider__item--active"
							: ""
					}`}
					onClick={() => {
						setImgActive(picture);
					}}>
					<img src={picture} alt='anh' />
				</div>
			);
		});
	};

	return (
		<div className='image-slider'>
			<div className='image-active'>
				<img src={imgActive} alt='' />
			</div>
			<div className='image-slider__list'>
				<Slider {...settings}>{renderPictures()}</Slider>
			</div>
		</div>
	);
}

export default ImageSlider;
