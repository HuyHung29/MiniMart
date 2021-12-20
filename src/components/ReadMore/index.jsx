import React, { useState } from "react";
import PropTypes from "prop-types";

ReadMore.propTypes = {
	children: PropTypes.string.isRequired,
	row: PropTypes.number.isRequired,
};

function ReadMore({ children, row }) {
	const [isReadMore, setIsReadMore] = useState(true);

	const style = {
		WebkitLineClamp: row,
		display: isReadMore ? "-webkit-box" : "block",
	};

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	return (
		<>
			<p className='read-more' style={style}>
				{children}
			</p>
			<span onClick={() => toggleReadMore()} className='read-more__btn'>
				{isReadMore ? "Xem thêm" : "Ẩn"}
			</span>
		</>
	);
}

export default ReadMore;
