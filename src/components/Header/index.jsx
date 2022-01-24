import Cart from "features/Purchase/components/Cart";
import { images } from "constant";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Button,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	Row,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "app/userSlice";

function Header() {
	const dispatch = useDispatch();
	const history = useHistory();
	const userInfo = useSelector((state) => state.users);
	const { user, isLogin } = userInfo;
	const { name, role } = user;

	const logout = () => {
		dispatch(userLogout());
		history.push("/");
	};

	return (
		<header className='header'>
			<Container>
				<div className='header__top'>
					<div className='header__top__side'>
						{role === "admin" ? (
							<Link className='header__top__item' to='/admin'>
								Trang quản trị
							</Link>
						) : (
							""
						)}
						<p className='header__top__item'>Tải ứng dụng</p>
						<p className='header__top__item header__top__item--social'>
							<span>Kết nối</span>
							<a
								href='https://www.facebook.com/profile.php?id=100011702486663'
								target='_blank'
								rel='noopener noreferrer'>
								{" "}
								<i className='header__top__icon fab fa-facebook'></i>
							</a>
							<a
								href='https://www.facebook.com/profile.php?id=100011702486663'
								target='_blank'
								rel='noopener noreferrer'>
								{" "}
								<i className='header__top__icon fab fa-instagram'></i>
							</a>
						</p>
					</div>
					<div className='header__top__side'>
						<p className='header__top__item header__top__item--none'>
							<i className='header__top__icon far fa-bell'></i>
							Thông báo
						</p>
						<a
							href='https://www.facebook.com/profile.php?id=100011702486663'
							target='_blank'
							rel='noopener noreferrer'
							className='header__top__item header__top__item--none'>
							<i className='header__top__icon far fa-question-circle'></i>
							Hỗ trợ
						</a>
						{isLogin ? (
							<div className='header__top__item'>
								<i className='header__top__icon fas fa-user-circle'></i>
								<p>{name}</p>

								<ul className='header__top__item--sub'>
									<li className='header__top__item--sub__item'>
										<Link to='/user'>
											Tài khoản của tôi
										</Link>
									</li>
									<li className='header__top__item--sub__item'>
										<Link to='/user/purchase'>Đơn mua</Link>
									</li>
									<li
										className='header__top__item--sub__item'
										onClick={logout}>
										Đăng xuất
									</li>
								</ul>
							</div>
						) : (
							<>
								<Link
									to='/user/register'
									className='header__top__item'>
									Đăng ký
								</Link>
								<Link
									to='/user/login'
									className='header__top__item'>
									Đăng nhập
								</Link>
							</>
						)}
					</div>
				</div>
				<div className='header__middle'>
					<Row className='align-content-center'>
						<Col md='3' className='header__middle__logo'>
							<Link to='/'>
								<img src={images.LOGO} alt='logo' />
							</Link>
						</Col>
						<Col className='header__middle__search'>
							<div className='form-wrap'>
								<Form
									className='header__middle__form'
									onSubmit={(e) => {
										e.preventDefault();
										history.push(
											`/products?search=${e.target.search.value}`
										);
									}}>
									<InputGroup>
										<Input
											name='search'
											className='header__middle__form__input'
											placeholder='Tìm kiếm sản phẩm'
										/>
										<Button className='header__middle__form__button'>
											<i className='fas fa-search '></i>
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
						<Col md='2'>
							<Cart />
						</Col>
					</Row>
				</div>
			</Container>
		</header>
	);
}

export default Header;
