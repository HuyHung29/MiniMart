import { yupResolver } from "@hookform/resolvers/yup";
import FileField from "components/Custom/FileField";
import InputField from "components/Custom/InputField";
import SelectField from "components/Custom/SelectField";
import { itemTitle } from "constant";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "reactstrap";

AddEditForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
};

function AddEditForm({
	onSubmit,
	schema,
	defaultValues,
	categories,
	editProduct,
}) {
	const {
		register,
		control,
		handleSubmit,
		reset,
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
					<Col md='12' key={index}>
						<FileField
							register={register(item)}
							name={item}
							errors={errors}
							label={itemTitle[item]}
							previewList={
								editProduct ? editProduct.pictures : undefined
							}
							key={index}
						/>
					</Col>
				);
			if (item === "category" || item === "unit") {
				if (item === "unit") {
					return (
						<Col md='6' key={index}>
							<Controller
								name={item}
								control={control}
								render={({ field }) => (
									<SelectField
										{...field}
										errors={errors}
										label={itemTitle[item]}
										options={[
											{
												value: "Kg",
												label: "Kg",
											},
											{
												value: "Gam",
												label: "Gam",
											},
										]}
										ref={null}
									/>
								)}
							/>
						</Col>
					);
				} else {
					return (
						<Col md='6' key={index}>
							<Controller
								name={item}
								control={control}
								render={({ field }) => (
									<SelectField
										{...field}
										errors={errors}
										label={itemTitle[item]}
										options={options}
										ref={null}
									/>
								)}
							/>
						</Col>
					);
				}
			}

			if (item === "description")
				return (
					<Col md='12' key={index}>
						<Controller
							name={item}
							control={control}
							render={({ field }) => (
								<InputField
									{...field}
									errors={errors}
									label={itemTitle[item]}
									type='textarea'
									ref={null}
								/>
							)}
						/>
					</Col>
				);
			return (
				<Col md='6' key={index}>
					<Controller
						name={item}
						control={control}
						render={({ field }) => (
							<InputField
								{...field}
								errors={errors}
								label={itemTitle[item]}
								ref={null}
							/>
						)}
					/>
				</Col>
			);
		});
	};

	return (
		<Form
			onSubmit={handleSubmit((data) => {
				onSubmit(data);
			})}>
			<Row>
				{renderController()}
				<Col className='text-center'>
					<Button
						type='submit'
						className='form__btn form__btn--success'>
						Tạo mới
					</Button>
					<Button
						className='form__btn form__btn--danger'
						onClick={() => reset()}>
						Hủy
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

AddEditForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default AddEditForm;
