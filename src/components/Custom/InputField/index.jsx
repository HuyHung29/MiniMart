import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	className: PropTypes.string,
};

InputField.defaultProps = {
	type: "text",
	name: "",
	label: "",
	placeholder: "",
};

function InputField(props) {
	const { name, errors, label, type, className, ...rest } = props;

	return (
		<FormGroup className='input'>
			{className ? (
				""
			) : (
				<Label for={name} className='input__label'>
					{label}
				</Label>
			)}
			<Input
				name={name}
				invalid={!!errors[name]}
				type={type}
				{...rest}
				className='input__control'
				autoComplete={type === "password" ? "off" : "on"}
			/>
			{errors[name] ? (
				<FormFeedback className='input__error'>
					{errors[name]?.message}
				</FormFeedback>
			) : (
				""
			)}
		</FormGroup>
	);
}

export default InputField;
