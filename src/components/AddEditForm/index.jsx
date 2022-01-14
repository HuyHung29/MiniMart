import { yupResolver } from "@hookform/resolvers/yup";
import CkEditor from "components/Custom/CkEditor";
import FileField from "components/Custom/FileField";
import InputField from "components/Custom/InputField";
import SelectField from "components/Custom/SelectField";
import { itemTitle } from "constant";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row } from "reactstrap";

AddEditForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	defaultValues: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
	editItem: PropTypes.object,
};

function AddEditForm({
	onSubmit,
	schema,
	defaultValues,
	categories,
	editItem,
}) {
	const history = useHistory();
	const {
		register,
		control,
		setValue,
		getValues,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "all",
		resolver: yupResolver(schema),
		defaultValues,
	});

	console.log(getValues());

	const options = categories.map((item) => {
		return { value: item._id, label: item.name };
	});

	const renderController = () => {
		const key = [];
		for (const i in defaultValues) {
			key.push(i);
		}

		return key.map((item, index) => {
			if (["pictures", "newPictures"].includes(item)) {
				if (editItem && item === "pictures") {
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
										type='text'
										ref={null}
										setFormValue={setValue}
									/>
								)}
							/>
						</Col>
					);
				}
				return (
					<Col md='12' key={index}>
						<FileField
							register={register(item)}
							name={item}
							errors={errors}
							label={itemTitle[item]}
							key={index}
						/>
					</Col>
				);
			}
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
								<CkEditor
									{...field}
									label={itemTitle[item]}
									setFormValue={setValue}
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
						{editItem ? "Cập nhật" : "Tạo mới"}
					</Button>
					<Button
						className='form__btn form__btn--danger'
						onClick={() => {
							if (editItem) {
								history.goBack();
							} else {
								reset();
							}
						}}>
						Hủy
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default AddEditForm;
