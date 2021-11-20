import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/InputField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";
import { formValidateData } from "constant";

const schema = yup
	.object({
		currentPassword: yup.string().required("Vui lòng nhập trường này"),
		newPassword: yup
			.string()
			.min(
				formValidateData.minPassword,
				`Cần tối thiểu ${formValidateData.minPassword} ký tự`
			)
			.notOneOf(
				[yup.ref("currentPassword"), null],
				"Mật khẩu mới cần khác mật khẩu hiện tại"
			)
			.required("Vui lòng nhập trường này"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("newPassword"), null], "Password must match")
			.required("Vui lòng nhập trường này"),
	})
	.required();

function Password({ onChangePassword }) {
	const defaultValues = {
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	};

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	console.log(isDirty, isValid);

	return (
		<div className='profile'>
			<div className='profile__header'>
				<h2 className='profile__heading'>Đổi mật khẩu</h2>
				<p className='profile__sub-heading'>
					Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho
					người khác
				</p>
			</div>
			<Form
				className='profile__user'
				id='profile-form'
				onSubmit={handleSubmit(() => {
					onChangePassword();
				})}>
				<div className='profile__user__field'>
					<p className='profile__user__label xl'>Mật khẩu hiện tại</p>
					<Controller
						name='currentPassword'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Mật khẩu hiện tại'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label xl'>Mật khẩu mới</p>
					<Controller
						name='newPassword'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Mật khẩu mới'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>
				<div className='profile__user__field'>
					<p className='profile__user__label xl'>Xác nhận mật khẩu</p>
					<Controller
						name='confirmPassword'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Xác nhận mật khẩu'
								ref={null}
								className='profile__user__input'
							/>
						)}
					/>
				</div>

				<Button
					className='profile__user__action xl'
					type='submit'
					disabled={!isDirty || !isValid}>
					Xác nhận
				</Button>
			</Form>
		</div>
	);
}

export default Password;
