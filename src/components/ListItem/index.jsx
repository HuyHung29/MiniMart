import { itemTitle, limitPerPage, listTitle } from "constant";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Select from "react-select";
import { Button, Input, Table } from "reactstrap";
import { findItemById } from "utils";

ListItem.propTypes = {
	productList: PropTypes.array,
	categoryList: PropTypes.array,
	postList: PropTypes.array,
	handleDeleteItem: PropTypes.func.isRequired,
	handleDeleteSelectedItem: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
};

function ListItem({
	productList,
	categoryList,
	postList,
	handleDeleteItem,
	handleDeleteSelectedItem,
	location,
}) {
	const categories = useSelector((state) => state.categories);
	const history = useHistory();
	const [checkList, setCheckList] = useState([]);
	const [listItem, setListItem] = useState(null);

	useEffect(() => {
		const list = productList || categoryList || postList;
		if (list) {
			setListItem(list);
		}
	}, [productList, categoryList, postList]);

	const { pathname, search } = location;
	const { limit, sort } = qs.parse(search);

	// handle replace sort on query params
	const replaceSort = (field) => {
		return sort
			? search.replace(`sort=${sort}`, `sort=${field}`)
			: search + `&sort=${field}`;
	};

	// handle replace limit on query params
	const replaceLimit = (number) => {
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

	// handle render title of list item
	const renderListTitle = () => {
		if (listItem) {
			return Object.keys(listItem[0]).map((title, index) => {
				return listTitle.includes(title) ? (
					<th key={index} className='listItem__title'>
						{itemTitle[title]}
					</th>
				) : null;
			});
		}
	};

	// handle render list item
	const renderListItem = () => {
		return listItem
			? listItem.map((item, index) => {
					return (
						<tr key={item._id}>
							{productList ? (
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
							) : null}
							<td className='listItem__item'>{index + 1}</td>
							{Object.keys(item).map((key, number) => {
								if (!listTitle.includes(key)) return null;

								if (key === "pictures")
									return (
										<td
											key={number}
											className='listItem__item'>
											<div className='listItem__listImg'>
												{item[key].map((img, index) => {
													if (index > 2) return null;
													if (
														index === 2 &&
														item[key].length > 3
													) {
														return (
															<div
																className='listItem__img listItem__img--last'
																key={index}>
																<img
																	src={img}
																	alt='anh'
																	key={index}
																	className=''
																/>
																<p>
																	+
																	{item[key]
																		.length -
																		3}
																</p>
															</div>
														);
													} else
														return (
															<img
																src={img}
																alt='anh'
																key={index}
																className='listItem__img'
															/>
														);
												})}
											</div>
										</td>
									);

								if (key === "category")
									return (
										<td
											key={number}
											className='listItem__item'>
											{
												findItemById(
													item[key],
													categories
												).name
											}
										</td>
									);

								return (
									<td key={number} className='listItem__item'>
										<p>{item[key]}</p>
									</td>
								);
							})}
							{categoryList ? null : (
								<>
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
											onClick={() =>
												handleDeleteItem(item._id)
											}>
											Xóa
										</Button>
									</td>
								</>
							)}
						</tr>
					);
			  })
			: null;
	};

	// handle heading of list item
	const renderListItemHeading = () => {
		if (productList)
			return <h1 className='listItem__heading'>Danh sách sản phẩm</h1>;
		if (categoryList)
			return <h1 className='listItem__heading'>Danh sách danh mục</h1>;
		if (postList)
			return <h1 className='listItem__heading'>Danh sách bài viết</h1>;
	};

	// handle when list is empty
	const renderEmptyHeading = () => {
		if (productList && productList.length === 0)
			return <p>Chưa có sản phẩm</p>;
		if (categoryList && categoryList.length === 0)
			return <p>Chưa có danh mục</p>;
		if (postList && postList.length === 0)
			return <p>Chưa có sản bài viết</p>;
	};

	// handle filter list products
	const renderFilter = () => {
		if (categoryList) return null;

		if (checkList.length !== 0) {
			return (
				<div className='filter'>
					<p className='check-quantity'>{`${checkList.length} sản phẩm được chọn`}</p>
					<Button
						className='check-action btn-danger'
						onClick={() =>
							handleDeleteSelectedItem(checkList, setCheckList)
						}>
						<i className='fas fa-trash-alt'></i>
					</Button>
				</div>
			);
		} else {
			return (
				<div className='filter'>
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
				</div>
			);
		}
	};

	// handle item per page
	const renderLimit = () => {
		if (!categoryList)
			return (
				<div className='limit'>
					<p className='limit__title'>Số sản phẩm trên một trang</p>
					<Select
						className='limit__select'
						onChange={(val) => {
							history.push(
								`${pathname}${replaceLimit(val.value)}`
							);
						}}
						defaultValue={
							limit
								? limitPerPage.find((item) => {
										return item.value === +limit;
								  })
								: limitPerPage[2]
						}
						options={limitPerPage}
					/>
				</div>
			);
	};

	// handle render list item
	const renderTable = () => {
		if (listItem) {
			return (
				<div className='listItem--wrap'>
					<Table bordered size='xl' className='listItem'>
						<thead className='listItem__header'>
							<tr>
								{productList ? (
									<th className='listItem__title'>
										<Input
											type='checkbox'
											name='checkAll'
											value={
												listItem
													? listItem.map(
															(item) => item._id
													  )
													: ""
											}
											onChange={handleCheck}
											className='check-input'
										/>
									</th>
								) : null}

								<th className='listItem__title'>STT</th>
								{renderListTitle()}
								{!categories ? <th colSpan='2'></th> : null}
							</tr>
						</thead>
						<tbody className='listItem__list'>
							{renderListItem()}
						</tbody>
					</Table>
					{renderLimit()}
				</div>
			);
		}

		return <div className='listItem--empty'>{renderEmptyHeading()}</div>;
	};

	return (
		<div>
			{/* list item heading */}
			{renderListItemHeading()}

			{/* add btn */}
			<Link to={`${pathname}/add`} className='btn btn-primary add-btn'>
				<i className='fas fa-plus'></i>
				<span>Thêm mới</span>
			</Link>

			{/* filter item */}
			{renderFilter()}

			{/* list item */}
			{renderTable()}
		</div>
	);
}

export default ListItem;
