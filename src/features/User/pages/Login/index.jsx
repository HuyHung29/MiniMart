import ForgetPasswordForm from "features/User/components/ForgetPasswordForm";
import LoginForm from "features/User/components/LoginForm";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

function Login() {
	const [forgetPassword, setForgetPassword] = useState(false);

	const onLoginSubmit = (data) => {
		console.log(data);
	};

	const onForgetPasswordSubmit = (data) => {
		console.log(data);
	};

	const defaultLoginValues = {
		email: "",
		password: "",
	};

	const defaultForgetPasswordValues = {
		email: "",
	};

	const goBack = () => {
		setForgetPassword(false);
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
					{/* form login */}
					<div
						className='form__wrap'
						id='form-login'
						style={{
							display: forgetPassword ? "none" : "block",
						}}>
						<h1 className='form__title'>Đăng nhập</h1>
						<LoginForm
							onSubmit={onLoginSubmit}
							defaultValues={defaultLoginValues}
						/>
						<p className='form__redirect'>
							Bạn chưa có tài khoản? Đăng ký{" "}
							<Link
								to='/user/register'
								className='form__redirect__link'>
								tại đây
							</Link>
							.
						</p>

						<p className='form__redirect'>
							<span
								className='form__redirect__link'
								onClick={() => {
									setForgetPassword(true);
								}}>
								Quên mật khẩu?
							</span>
						</p>
					</div>

					{/* Form forget password */}
					<div
						className='form__wrap'
						id='form-forget'
						style={{
							display: forgetPassword ? "block" : "none",
						}}>
						<h1 className='form__title'>Đặt lại mật khẩu</h1>
						<ForgetPasswordForm
							onSubmit={onForgetPasswordSubmit}
							defaultValues={defaultForgetPasswordValues}
							goBack={goBack}
						/>
					</div>

					{/* Login with social  */}
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
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
