import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

const schema = yup
	.object({
		surname: yup
			.string()
			.min(2, "Cần tối thiếu 2 kí tự")
			.required("Vui lòng nhập trường này"),
		name: yup
			.string()
			.min(2, "Cần tối thiếu 2 kí tự")
			.required("Vui lòng nhập trường này"),
		phone: yup.string().matches(/^[0-9]{9,}$/, {
			message: "Số điện thoại phải có nhiều hơn 9 chữ số",
			excludeEmptyString: true,
		}),
		email: yup
			.string()
			.email("Nhập sai định dạng email")
			.required("Vui lòng nhập trường này"),
		password: yup.string().required("Vui lòng nhập trường này"),
	})
	.required();

function RegisterForm({ onSubmit, defaultValues }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	return (
		<Form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			<Controller
				name='surname'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Họ'
						placeholder='Họ'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='name'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Tên'
						placeholder='Tên'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='phone'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Số điện thoại'
						placeholder='Số điện thoại'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Email'
						placeholder='Email'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='Mật khẩu'
						placeholder='Mật khẩu'
						type='password'
						ref={null}
					/>
				)}
			/>
			<Button
				type='submit'
				className='form__btn form__btn--success form__btn--block'>
				Đăng ký
			</Button>
		</Form>
	);
}

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
};

export default RegisterForm;
