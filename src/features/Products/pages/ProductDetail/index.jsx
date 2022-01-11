import productsApi from "api/productsApi";
import ImageSlider from "components/ImageSlider";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function ProductDetail(props) {
	const { search } = useLocation();
	const { id } = qs.parse(search);
	const [product, setProduct] = useState({});

	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await productsApi.getProductById(id);
				setProduct({ ...response.data.product });
			} catch (error) {}
		};

		getProduct();
	}, [id]);

	return (
		<Container>
			<Row>
				{product ? (
					<>
						<Col md='4'>
							<ImageSlider
								pictures={product.pictures}
								slidesToScroll={1}
								slidesToShow={4}
								withModal={true}
								dots={false}
							/>
						</Col>
						<Col md='8'>a</Col>
					</>
				) : (
					""
				)}
			</Row>
		</Container>
	);
}

ProductDetail.propTypes = {};

export default ProductDetail;
