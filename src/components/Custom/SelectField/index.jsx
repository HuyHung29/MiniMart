import React from "react";
import PropTypes from "prop-types";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import Classnames from "classnames";

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	className: PropTypes.string,
	value: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

SelectField.defaultProps = {
	name: "",
	label: "",
	placeholder: "",
};

function SelectField(props) {
	const {
		name,
		errors,
		label,
		type,
		className,
		options,
		onChange,
		value,
		...rest
	} = props;

	const coloursStyles = {
		control: (styles) => ({ ...styles, borderColor: "#dc3545" }),
	};

	return (
		<FormGroup className='select'>
			{className ? (
				""
			) : (
				<Label for={name} className='select__label'>
					{label}
				</Label>
			)}
			<Select
				name={name}
				value={options.find((c) => c.value === value)}
				onChange={(val) => onChange(val.value)}
				options={options}
				className={Classnames({
					"is-invalid": !!errors[name],
				})}
				classNamePrefix='select__input'
				styles={!!errors[name] ? coloursStyles : {}}
				autoComplete={type === "password" ? "off" : "on"}
				{...rest}
			/>
			{errors[name] ? (
				<FormFeedback className='select__error'>
					{errors[name]?.message}
				</FormFeedback>
			) : (
				""
			)}
		</FormGroup>
	);
}

export default SelectField;
