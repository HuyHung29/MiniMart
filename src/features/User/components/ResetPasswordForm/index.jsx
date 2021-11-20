import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";

ResetPasswordForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
};

const schema = yup
	.object({
		resetPassword: yup.string().required("Vui lòng nhập trường này"),
		confirmResetPassword: yup
			.string()
			.oneOf([yup.ref("resetPassword"), null], "Password must match"),
	})
	.required();

function ResetPasswordForm({ onSubmit, defaultValues, goBack }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	return (
		<Form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			<Controller
				name='resetPassword'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='NewPassword'
						placeholder='NewPassword'
						type='password'
						ref={null}
					/>
				)}
			/>
			<Controller
				name='confirmResetPassword'
				control={control}
				render={({ field }) => (
					<InputField
						{...field}
						errors={errors}
						label='ConfirmPassword'
						placeholder='ConfirmPassword'
						type='password'
						ref={null}
					/>
				)}
			/>
			<Button type='submit' className='form__btn form__btn--success'>
				Gửi
			</Button>
			<Button className='form__btn form__btn--danger' onClick={goBack}>
				Hủy
			</Button>
		</Form>
	);
}

export default ResetPasswordForm;
