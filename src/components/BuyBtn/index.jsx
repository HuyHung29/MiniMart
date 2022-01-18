import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

BuyBtn.propTypes = {
	content: PropTypes.string.isRequired,
	className: PropTypes.string,
};

function BuyBtn({ content, className }) {
	return (
		<Button className={`buy-btn shadow-none  ${className}`}>
			{content}
		</Button>
	);
}

export default BuyBtn;
