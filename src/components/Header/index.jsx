import Cart from "components/Cart";
import { images } from "constant";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	Row,
} from "reactstrap";

Header.propTypes = {
	isLogin: PropTypes.bool.isRequired,
	logout: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
};

Header.defaultProps = {
	userName: "",
};

function Header({ isLogin, userName, logout }) {
	return (
		<header className='header'>
			<Container>
				<Row className='header__top'>
					<Col>
						<i className='header__top__icon fas fa-check'></i>
						<span className='header__top__text'>
							Giá cả nhiều ưu đãi hấp dẫn khi mua hàng
						</span>
					</Col>
					<Col>
						<i className='header__top__icon fas fa-plane'></i>
						<span className='header__top__text'>
							Giao hàng miễn phí toàn quốc & nhanh chóng
						</span>
					</Col>
					<Col>
						<i className='header__top__icon fas fa-star'></i>
						<span className='header__top__text'>
							Sản phẩm đa dạng đạt tiêu chuẩn có kiểm định
						</span>
					</Col>
				</Row>
			</Container>
			<div
				className='header__middle'
				style={{ backgroundImage: `url(${images.BG_MID_HEADER})` }}>
				<Container>
					<Row className=' header__middle__container align-content-center'>
						<Col md='3' className='header__middle__logo'>
							<Link to='/'>
								<img src={images.LOGO} alt='logo' />
							</Link>
						</Col>
						<Col md='5' className='header__middle__search'>
							<div className='form-wrap'>
								<Form className='header__middle__form'>
									<i className='fas fa-search header__middle__form__icon'></i>
									<InputGroup>
										<Input
											className='header__middle__form__input'
											placeholder='Tìm kiếm ở đây'
										/>
										<Button
											className='header__middle__form__button'
											style={{
												backgroundImage: `url(${images.BG_SEARCH})`,
											}}>
											Tìm kiếm
										</Button>
									</InputGroup>
								</Form>
							</div>
							<div className='header__middle__bottom'>
								<ul className='header__middle__menu'>
									<li className='header__middle__item'>
										Bán chạy nhất
									</li>
									<li className='header__middle__item'>
										Mua nhiều nhất
									</li>
									<li className='header__middle__item'>
										Giảm giá
									</li>
								</ul>
							</div>
						</Col>
						<Col className='header__middle__user'>
							<div className='favorite-list'>
								<i className='fas fa-heart'></i>
								<p>Danh sách yêu thích</p>
							</div>
							<div className='account'>
								<i className='fas fa-user'></i>
								<div className='account__action'>
									{isLogin ? (
										<>
											<Link
												className='account__action__link user-name'
												to='/user'>
												{userName}
											</Link>
											<p
												className='account__action__link'
												onClick={logout}>
												Đăng xuất
											</p>
										</>
									) : (
										<>
											<Link
												className='account__action__link'
												to='/user/login'>
												Đăng nhập
											</Link>
											<Link
												className='account__action__link'
												to='/user/register'>
												Đăng ký
											</Link>
										</>
									)}
								</div>
							</div>
							<Cart />
						</Col>
					</Row>
				</Container>
			</div>
		</header>
	);
}

export default Header;
