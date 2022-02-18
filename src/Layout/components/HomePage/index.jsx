import ProductSlider from "components/ProductSlider";
import ReadMore from "components/ReadMore";
import { bannerImg, images } from "constant";
import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function HomePage() {
	const products = useSelector((state) => state.products.listProduct);
	const posts = useSelector((state) => state.posts.listPosts);

	const renderListPost = () => {
		return posts.map((post, index) => {
			return index < 3 ? (
				<Col key={index}>
					<div className='home__post__item'>
						<Link
							className='home__post__item__img'
							to={{
								pathname: `/posts/${post.title.replaceAll(
									" ",
									"-"
								)}`,
								state: {
									postId: post._id,
								},
							}}>
							<img
								src={post.pictures[0]}
								alt='anh'
								title={post.title}
							/>
						</Link>
						<div className='home__post__item__content'>
							<Link
								className='home__post__item__link'
								to={{
									pathname: `/posts/${post.title.replaceAll(
										" ",
										"-"
									)}`,
									state: {
										postId: post._id,
									},
								}}
								title={post.title}>
								{post.title}
							</Link>
							<ReadMore
								row={4}
								readMore={false}
								content={parse(post.description)}
							/>
						</div>
					</div>
				</Col>
			) : null;
		});
	};

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
					<Col md='12' className='home__slider'>
						<div className='home__link--wrap'>
							<Link to='/products' className='home__link'>
								Sản phẩm bán chạy
							</Link>
						</div>
						<ProductSlider
							dots={false}
							slidesToShow={5}
							slidesToScroll={5}
							products={products}
						/>
					</Col>
					<Col md='12' className='home__slider'>
						<div className='home__link--wrap'>
							<Link to='/products' className='home__link'>
								Rau quả
							</Link>
						</div>
						<ProductSlider
							dots={false}
							slidesToShow={5}
							slidesToScroll={5}
							products={products}
						/>
					</Col>
					<Col md='12' className='home__slider'>
						<div className='home__link--wrap'>
							<Link to='/products' className='home__link'>
								Đồ đông lạnh
							</Link>
						</div>
						<ProductSlider
							dots={false}
							slidesToShow={5}
							slidesToScroll={5}
							products={products}
						/>
					</Col>
					<Col md='12' className='home__slider'>
						<div className='home__link--wrap'>
							<Link to='/products' className='home__link'>
								Hoa quả
							</Link>
						</div>
						<ProductSlider
							dots={false}
							slidesToShow={5}
							slidesToScroll={5}
							products={products}
						/>
					</Col>
					<Col md='12' className='home__post'>
						<div className='home__link--wrap'>
							<Link to='/posts' className='home__link'>
								Mẹo hay sử dụng
							</Link>
						</div>
						<div className='home__post__list'>
							<Row>{renderListPost()}</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default HomePage;
