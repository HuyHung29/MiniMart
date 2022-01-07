import React from "react";
import PropTypes from "prop-types";
import ProductCard from "features/Products/components/ProductCard";
import { Row } from "reactstrap";

ListProducts.propTypes = {
	products: PropTypes.array.isRequired,
};

function ListProducts({ products }) {
	const renderProductItem = () => {
		return products.map((item, index) => {
			return <ProductCard key={index} product={item} width={3} />;
		});
	};
	return <Row className='product-list'>{renderProductItem()}</Row>;
}

export default ListProducts;
