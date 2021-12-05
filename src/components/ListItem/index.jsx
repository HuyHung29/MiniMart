import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { findItemById } from "utils";
import moment from "moment";
import { itemTitle } from "constant";

ListItem.propTypes = {
	listItem: PropTypes.array.isRequired,
	handleDeleteItem: PropTypes.func.isRequired,
	handleDeleteSelectedItem: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	url: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
	listItem: [],
	categories: [],
	url: "",
};

function ListItem({
	listItem,
	handleDeleteItem,
	handleDeleteSelectedItem,
	categories,
	url,
}) {
	const [checkList, setCheckList] = useState([]);

	// Handle select item
	const handleCheck = (e) => {
		const target = e.target;
		const name = e.target.name;
		const value = e.target.value;
		if (target.checked && !checkList.includes(value)) {
			if (name === "checkAll") {
				if (value !== "") {
					const listValue = value.split(",");
					setCheckList([...checkList, ...listValue]);
				}
			} else {
				setCheckList([...checkList, value]);
			}
		} else {
			if (name === "checkAll") setCheckList([]);
			else {
				const index = checkList.findIndex(
					(item) => item === e.target.value
				);
				checkList.splice(index, 1);
				setCheckList([...checkList]);
			}
		}
	};

	const renderListTitle = () => {
		if (listItem.length !== 0) {
			return Object.keys(listItem[0]).map((title, index) => {
				if (title === "_id" || title === "postedBy" || title === "__v")
					return null;
				return (
					<th key={index} className='listItem__title'>
						{itemTitle[title]}
					</th>
				);
			});
		}
	};

	const renderListItem = () => {
		return listItem.map((item, index) => {
			return (
				<tr key={item._id}>
					<th scope='row' className='listItem__item'>
						<Input
							className='check-input'
							type='checkbox'
							name='checkbox'
							value={item._id}
							onChange={handleCheck}
							checked={checkList.includes(item._id)}
						/>
					</th>
					<td className='listItem__item'>{index + 1}</td>
					{Object.keys(item).map((key, number) => {
						if (
							key === "_id" ||
							key === "postedBy" ||
							key === "__v"
						)
							return null;

						if (key === "pictures")
							return (
								<td key={number} className='listItem__item'>
									<div>
										{item[key].map((img, index) => (
											<img
												src={img}
												alt='anh'
												key={index}
												className='listItem__img'
											/>
										))}
									</div>
								</td>
							);

						if (key === "category")
							return (
								<td key={number} className='listItem__item'>
									{findItemById(item[key], categories).name}
								</td>
							);

						if (key === "createdAt" || key === "updatedAt")
							return (
								<td key={number} className='listItem__item'>
									{moment(item[key]).format("DD/MM/YYYY")}
								</td>
							);
						return (
							<td key={number} className='listItem__item'>
								{item[key]}
							</td>
						);
					})}
					<td className='listItem__item'>
						<Link
							to={`${url}/edit/${item._id}`}
							className='btn btn-primary listItem__btn'>
							Sửa
						</Link>
					</td>
					<td className='listItem__item'>
						<Button
							className='listItem__btn'
							color='danger'
							onClick={() => handleDeleteItem(item._id)}>
							Xóa
						</Button>
					</td>
				</tr>
			);
		});
	};

	return (
		<>
			<Link to={`${url}/add`} className='btn btn-primary add-btn'>
				<i className='fas fa-plus'></i>
				<span>Thêm mới</span>
			</Link>
			<div className='filter'>
				{checkList.length !== 0 ? (
					<>
						<p className='check-quantity'>{`${checkList.length} sản phẩm được chọn`}</p>
						<Button
							className='check-action btn-danger'
							onClick={() =>
								handleDeleteSelectedItem(
									checkList,
									setCheckList
								)
							}>
							<i className='fas fa-trash-alt'></i>
						</Button>
					</>
				) : (
					<>
						<p className='filter'></p>
						<Button className='filter-btn btn-danger'>
							<i className='fas fa-list-ul'></i>
						</Button>
					</>
				)}
			</div>
			<Table bordered size='xl' className='listItem'>
				<thead className='listItem__header'>
					<tr>
						<th className='listItem__title'>
							<Input
								type='checkbox'
								name='checkAll'
								value={listItem.map((item) => item._id)}
								onChange={handleCheck}
								className='check-input'
							/>
						</th>
						<th className='listItem__title'>STT</th>
						{renderListTitle()}
						<th colSpan='2'></th>
					</tr>
				</thead>
				<tbody className='listItem__list'>{renderListItem()}</tbody>
			</Table>
		</>
	);
}

export default ListItem;
