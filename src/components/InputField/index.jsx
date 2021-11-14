import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

function InputField(props) {
	const { name, errors, label, type, ...rest } = props;

	return (
		<FormGroup className='input'>
			<Label for={name} className='input__label'>
				{label}
			</Label>
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

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	type: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
};

InputField.defaultProps = {
	type: "text",
};

export default InputField;
