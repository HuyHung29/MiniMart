import React from "react";
import { Col, Container, Row } from "reactstrap";
import { images, bannerImg } from "constant/index";

function Home() {
	return (
		<>
			<div className='top-slider'>
				<img src={images.SLIDER_IMG} alt='slider' />
			</div>
			<Container className='home'>
				<Row className='home__banner'>
					{bannerImg.map((item, index) => {
						return (
							<Col key={index}>
								<div className='home__banner__item'>
									<img
										src={item}
										alt='banner'
										className='home__banner__img'
									/>
								</div>
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}

export default Home;
