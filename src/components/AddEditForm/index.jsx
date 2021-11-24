import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Custom/InputField";
import SelectField from "components/Custom/SelectField";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "reactstrap";

AddEditForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
};

function AddEditForm({ onSubmit, schema, defaultValues, categories }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
		defaultValues,
	});

	const options = categories.map((item) => {
		return { value: item._id, label: item.name };
	});

	const renderController = () => {
		const key = [];
		for (const i in defaultValues) {
			key.push(i);
		}

		return key.map((item, index) => {
			if (item === "pictures")
				return (
					<Controller
						name={item}
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label={item}
								type='file'
								accept='image/png, image/jpeg'
								ref={null}
							/>
						)}
						key={index}
					/>
				);
			if (item === "category")
				return (
					<Controller
						name={item}
						control={control}
						render={({ field }) => (
							<SelectField
								{...field}
								errors={errors}
								label={item}
								options={options}
								ref={null}
							/>
						)}
						key={index}
					/>
				);
			return (
				<Controller
					name={item}
					control={control}
					render={({ field }) => (
						<InputField
							{...field}
							errors={errors}
							label={item}
							ref={null}
						/>
					)}
					key={index}
				/>
			);
		});
	};

	return (
		<Form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			{renderController()}
			<Button type='submit' className='form__btn form__btn--success'>
				Gửi
			</Button>
			<Button className='form__btn form__btn--danger'>Hủy</Button>
		</Form>
	);
}

AddEditForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default AddEditForm;
