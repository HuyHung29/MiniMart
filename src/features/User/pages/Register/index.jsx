import RegisterForm from "features/User/components/RegisterForm";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import userApi from "api/userApi";

function Register() {
	const onSubmit = (data) => {
		console.log(data);
		const register = async () => {
			try {
				const result = await userApi.register(data);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		};

		register();
	};

	const defaultValues = {
		surname: "",
		name: "",
		phone: "",
		email: "",
		password: "",
	};
	return (
		<Container fluid className='register form__background'>
			<Row>
				<Col
					md={{
						offset: 4,
						size: 4,
					}}
					className=' form'>
					<div className='form__wrap' id='form-register'>
						<h1 className='form__title'>Thông tin cá nhân</h1>
						<RegisterForm
							onSubmit={onSubmit}
							defaultValues={defaultValues}
						/>
						<p className='form__redirect'>
							Bạn đã có tài khoản? Đăng nhập{" "}
							<Link
								to='/user/login'
								className='form__redirect__link'>
								tại đây
							</Link>
							.
						</p>

						<div className='form__social-login'>
							<p className='form__social-login__title'>
								Hoặc đăng nhập bằng
							</p>
							<div className='form__social-login__list'>
								<div className='form__social-login__item form__social-login__item--facebook'>
									<i className='fab fa-facebook-f form__social-login__item__icon'></i>
									<p className='form__social-login__item__text'>
										Facebook
									</p>
								</div>
								<div className='form__social-login__item form__social-login__item--google'>
									<i className='fab fa-google-plus-g form__social-login__item__icon'></i>
									<p className='form__social-login__item__text'>
										Google
									</p>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Register;
