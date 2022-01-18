import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";
import * as yup from "yup";
import { formValidateData } from "constant";
import { toast } from "react-toastify";
import userApi from "api/userApi";

const schema = yup
	.object({
		password: yup.string().required("Vui lòng nhập trường này"),
		newPassword: yup
			.string()
			.min(
				formValidateData.minPassword,
				`Cần tối thiểu ${formValidateData.minPassword} ký tự`
			)
			.notOneOf(
				[yup.ref("password"), null],
				"Mật khẩu mới cần khác mật khẩu hiện tại"
			)
			.required("Vui lòng nhập trường này"),
		confirmNewPassword: yup
			.string()
			.oneOf([yup.ref("newPassword"), null], "Password must match")
			.required("Vui lòng nhập trường này"),
	})
	.required();

function Password() {
	const defaultValues = {
		password: "",
		newPassword: "",
		confirmNewPassword: "",
	};

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
		defaultValues: defaultValues,
	});

	const onUserChangePassword = (data) => {
		const changePassword = async () => {
			try {
				console.log(data);
				await userApi.changePassword(data);
				reset();
			} catch (error) {
				throw error.response.data;
			}
		};

		toast.promise(changePassword, {
			pending: "Đang xử lý",
			success: "Đổi mật khẩu thành công",
			error: {
				render: ({ data }) => {
					return <p>{data.message}</p>;
				},
			},
		});
	};

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
				onSubmit={handleSubmit(onUserChangePassword)}>
				<div className='profile__user__field'>
					<p className='profile__user__label xl'>Mật khẩu hiện tại</p>
					<Controller
						name='password'
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
						name='confirmNewPassword'
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label=''
								placeholder='Xác nhận khẩu mới'
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
