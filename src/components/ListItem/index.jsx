import ReadMore from "components/ReadMore";
import { itemTitle } from "constant";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { Button, Input, Table } from "reactstrap";
import { findItemById } from "utils";

ListItem.propTypes = {
	listItem: PropTypes.array.isRequired,
	handleDeleteItem: PropTypes.func.isRequired,
	handleDeleteSelectedItem: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired,
};

ListItem.defaultProps = {
	listItem: [],
	categories: [],
	location: {},
};

function ListItem({
	listItem,
	handleDeleteItem,
	handleDeleteSelectedItem,
	categories,
	location,
}) {
	const [checkList, setCheckList] = useState([]);
	const limitPerPage = [
		{ value: 5, label: "5" },
		{ value: 10, label: "10" },
		{ value: 25, label: "25" },
		{ value: 100, label: "100" },
	];
	const { pathname, search } = location;
	const history = useHistory();

	const deleteSearch = () => {
		return search.includes("limit=")
			? search.substr(0, search.indexOf("limit=")) +
					search.substr(search.indexOf("limit=") + 6)
			: search + "&";
	};
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

						if (key === "description")
							return (
								<td key={number} className='listItem__item'>
									<ReadMore row={5}>{item[key]}</ReadMore>
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
							to={`${pathname}/edit/${item._id}`}
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
			<Link to={`${pathname}/add`} className='btn btn-primary add-btn'>
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
						<p></p>
						<div className='filter-task'>
							<i className='fas fa-list-ul'></i>

							<ul className='filter-task__list'>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: "?sort=-price",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => {
											return (
												pathname + search ===
												`${pathname}?sort=-price`
											);
										}}>
										Giá từ cao đến thấp{" "}
										<i className='fas fa-sort-amount-down'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: "?sort=price",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => {
											return (
												pathname + search ===
												`${pathname}?sort=price`
											);
										}}>
										Giá từ thấp đến cao{" "}
										<i className='fas fa-sort-amount-up'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: "?sort=title",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => {
											return (
												pathname + search ===
												`${pathname}?sort=title`
											);
										}}>
										Tên từ A - Z{" "}
										<i className='fas fa-sort-alpha-down'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: "?sort=-title",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => {
											return (
												pathname + search ===
												`${pathname}?sort=-title`
											);
										}}>
										Tên từ Z - S{" "}
										<i className='fas fa-sort-alpha-up'></i>
									</NavLink>
								</li>
							</ul>
						</div>
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
			<div className='limit'>
				<p className='limit__title'>Số sản phẩm trên một trang</p>
				<Select
					className='limit__select'
					onChange={(val) => {
						history.push(
							`${pathname}${
								search ? deleteSearch() : "?"
							}&limit=${val.value}`
						);
					}}
					defaultValue={limitPerPage[0]}
					options={limitPerPage}
				/>
			</div>
		</>
	);
}

export default ListItem;