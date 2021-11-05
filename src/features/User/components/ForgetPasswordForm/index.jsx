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
	})
	.required();

function ForgetPasswordForm({ onSubmit, defaultValues, goBack }) {
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
			<Button type='submit' className='form__btn form__btn--success'>
				Gửi
			</Button>
			<Button className='form__btn form__btn--danger' onClick={goBack}>
				Hủy
			</Button>
		</Form>
	);
}

ForgetPasswordForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	goBack: PropTypes.func.isRequired,
};

export default ForgetPasswordForm;
