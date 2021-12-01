import React, { useState } from "react";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";

FileField.propTypes = {
	register: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
};

FileField.defaultProps = {
	name: "",
	label: "",
};

function FileField(props) {
	const { register, errors, name, label, previewList } = props;
	const [files, setFiles] = useState([]);

	const handleChange = (e) => {
		register.onChange(e);
		setFiles(e.target.files);
	};

	const renderPreviewList = () => {
		if (previewList && [...files].length === 0) {
			return previewList.map((item, index) => {
				return (
					<li key={index}>
						<img src={item} alt='anh' className='preview__img' />
					</li>
				);
			});
		}

		return (
			files &&
			[...files].map((file, index) => (
				<li key={index}>
					<img
						src={URL.createObjectURL(file)}
						alt='anh'
						className='preview__img'
					/>
				</li>
			))
		);
	};

	return (
		<FormGroup className='input'>
			<Label className='input__label'>{label}</Label>

			<input
				{...register}
				type='file'
				onChange={handleChange}
				multiple
				className='form-control input__control'
				aria-describedby='inputGroupFileAddon04'
				aria-label='Upload'
				accept='image/*'
			/>

			{errors[name] ? (
				<FormFeedback className='input__error'>
					{errors[name]?.message}
				</FormFeedback>
			) : (
				""
			)}

			<ul className='preview__list'>{renderPreviewList()}</ul>
		</FormGroup>
	);
}

export default FileField;
