import { unwrapResult } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import ForgetPasswordForm from "features/User/components/ForgetPasswordForm";
import LoginForm from "features/User/components/LoginForm";
import ResetPasswordForm from "features/User/components/ResetPasswordForm";
import { userLogin } from "app/userSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";

function Login() {
	const [isForgetPassword, setIsForgetPassword] = useState(false);
	const [isResetPassword, setIsResetPassword] = useState(false);
	const [resetCode, setResetCode] = useState(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLoginSubmit = (data) => {
		const login = async () => {
			try {
				const result = await dispatch(userLogin(data));
				const originalResult = unwrapResult(result);
				console.log(originalResult);
				history.push("/");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(login, {
			pending: "Đang xử lý",
			success: "Đăng nhập thành công",
			error: {
				render({ data }) {
					return `Đăng nhập thất bại ${data.message}`;
				},
			},
		});
	};

	const onForgetPasswordSubmit = (data) => {
		const forgetPassword = async () => {
			try {
				const response = await userApi.forgetPassword(data);
				setIsResetPassword(true);
				setResetCode(response.data.resetCode);
			} catch (error) {
				throw error.response.data;
			}
		};

		toast.promise(forgetPassword, {
			pending: "Đang xử lý",
			success: "Nhâp mật khẩu mới",
			error: {
				render({ data }) {
					return `${data.message}`;
				},
			},
		});
	};

	const onResetPasswordSubmit = (data) => {
		const resetPassword = async () => {
			try {
				await userApi.resetPassword({
					...data,
					resetCode,
				});
				setIsForgetPassword(false);
			} catch (error) {
				throw error.response.data;
			}
		};

		toast.promise(resetPassword, {
			pending: "Đang xử lý",
			success: "Đổi mật khẩu thành công",
			error: {
				render({ data }) {
					return `${data.message}`;
				},
			},
		});
	};

	const defaultLoginValues = {
		email: "",
		password: "",
	};

	const defaultForgetPasswordValues = {
		email: "",
	};

	const defaultResetPasswordValues = {
		resetPassword: "",
		confirmResetPassword: "",
	};

	const goBack = () => {
		setIsForgetPassword(false);
		setIsResetPassword(false);
	};

	return (
		<Container fluid className='login'>
			<Row>
				<Col
					md={{
						offset: 4,
						size: 4,
					}}
					className='form'>
					{/* form login */}
					<div
						className='form__wrap'
						id='form-login'
						style={{
							display: isForgetPassword ? "none" : "block",
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
									setIsForgetPassword(true);
								}}>
								Quên mật khẩu?
							</span>
						</p>
					</div>

					{/* Form forget and reset password */}
					<div
						className='form__wrap'
						id='form-reset-forget'
						style={{
							display: isForgetPassword ? "block" : "none",
						}}>
						<h1 className='form__title'>Đặt lại mật khẩu</h1>
						{isResetPassword ? (
							<ResetPasswordForm
								onSubmit={onResetPasswordSubmit}
								defaultValues={defaultResetPasswordValues}
								goBack={goBack}
							/>
						) : (
							<ForgetPasswordForm
								onSubmit={onForgetPasswordSubmit}
								defaultValues={defaultForgetPasswordValues}
								goBack={goBack}
							/>
						)}
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
