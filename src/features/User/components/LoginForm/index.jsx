import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

const schema = yup
	.object({
		email: yup
			.string()
			.email("Nhập sai định dạng email")
			.required("Vui lòng nhập trường này"),
		password: yup.string().required("Vui lòng nhập trường này"),
	})
	.required();

function LoginForm({ onSubmit, defaultValues }) {
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
				Đăng nhập
			</Button>
		</Form>
	);
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
};

export default LoginForm;
