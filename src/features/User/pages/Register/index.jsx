import RegisterForm from "features/User/components/RegisterForm";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import userApi from "api/userApi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
	const history = useHistory();
	const onSubmit = (data) => {
		const register = async () => {
			console.log(data);
			try {
				const response = await userApi.register(data);
				const id = response.data.user._id;
				await userApi.confirm(id);
				history.push("/user/login");
			} catch (error) {
				throw error;
			}
		};

		toast.promise(register, {
			pending: "Đang xử lý",
			success: "Đăng ký thành công",
			error: {
				render: ({ data }) => {
					const { message } = data.response.data;
					return `Đăng kí thất bại với lỗi: ${message}`;
				},
			},
		});
	};

	const defaultValues = {
		surname: "",
		name: "",
		phone: "",
		email: "",
		password: "",
	};
	return (
		<Container fluid className='register'>
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
