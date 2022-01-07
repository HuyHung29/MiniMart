import { itemTitle, listTitle } from "constant";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
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
	const { limit, sort } = qs.parse(search);

	const replaceSort = (field) => {
		return sort
			? search.replace(`sort=${sort}`, `sort=${field}`)
			: search + `&sort=${field}`;
	};

	const replaceLimit = (number) => {
		if (search) {
			return limit
				? search.replace(`limit=${limit}`, `limit=${number}`)
				: search + "&limit=" + number;
		}
		return "?limit=" + number;
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
				return listTitle.includes(title) ? (
					<th key={index} className='listItem__title'>
						{itemTitle[title]}
					</th>
				) : null;
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
						if (!listTitle.includes(key)) return null;

						if (key === "pictures")
							return (
								<td key={number} className='listItem__item'>
									<div className='listItem__listImg'>
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

						return (
							<td key={number} className='listItem__item'>
								<p>{item[key]}</p>
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
											search: search
												? replaceSort("-price")
												: "?sort=-price",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => sort === "-price"}>
										Giá từ cao đến thấp{" "}
										<i className='fas fa-sort-amount-down'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: search
												? replaceSort("price")
												: "?sort=price",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => sort === "price"}>
										Giá từ thấp đến cao{" "}
										<i className='fas fa-sort-amount-up'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: search
												? replaceSort("title")
												: "?sort=title",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => sort === "title"}>
										Tên từ A - Z{" "}
										<i className='fas fa-sort-alpha-down'></i>
									</NavLink>
								</li>
								<li className='filter-task__item'>
									<NavLink
										to={{
											pathname: pathname,
											search: search
												? replaceSort("-title")
												: "?sort=-title",
										}}
										className='filter-task__link'
										activeClassName='filter-task__link--active'
										isActive={() => sort === "-title"}>
										Tên từ Z - S{" "}
										<i className='fas fa-sort-alpha-up'></i>
									</NavLink>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
			{listItem.length === 0 ? (
				<div className='listItem--empty'>Chưa có sản phẩm nào</div>
			) : (
				<>
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
						<tbody className='listItem__list'>
							{renderListItem()}
						</tbody>
					</Table>
					<div className='limit'>
						<p className='limit__title'>
							Số sản phẩm trên một trang
						</p>
						<Select
							className='limit__select'
							onChange={(val) => {
								console.log(val.value);
								history.push(
									`${pathname}${replaceLimit(val.value)}`
								);
							}}
							defaultValue={
								limit
									? limitPerPage.find((item) => {
											return item.value === +limit;
									  })
									: limitPerPage[0]
							}
							options={limitPerPage}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default ListItem;
