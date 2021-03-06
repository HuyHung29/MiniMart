import Pagination from "components/Pagination";
import { images, limitPerPage } from "constant";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Select from "react-select";
import { Button, Input } from "reactstrap";
import cls from "classnames";

ProductsList.propTypes = {
	productList: PropTypes.array,
	categoryList: PropTypes.array,
	postList: PropTypes.array,
	handleDeleteItem: PropTypes.func.isRequired,
	handleDeleteSelectedItem: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
};

function ProductsList({
	handleDeleteItem,
	handleDeleteSelectedItem,
	location,
}) {
	const categories = useSelector((state) => state.categories);
	const products = useSelector((state) => state.products.listProduct);
	const { total } = useSelector((state) => state.products.pagination);
	const history = useHistory();
	const [checkList, setCheckList] = useState([]);
	const [view, setView] = useState(true);

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

	const renderListProduct = () => {
		return products.length === 0 ? (
			<div className='list__body--empty'>
				<img src={images.LIST_EMPTY} alt='anh' />
				<p>Kh??ng t??m th???y s???n ph???m</p>
			</div>
		) : (
			products.map((product, index) => (
				<div className='list__item' key={index}>
					<div className='list__checkbox list__checkbox--body'>
						<Input
							className='check-input shadow-none'
							type='checkbox'
							name='checkbox'
							value={product._id}
							onChange={handleCheck}
							checked={checkList.includes(product._id)}
						/>
					</div>
					<div className='list__name list__name--body'>
						<p>{product.title}</p>
					</div>
					<div className='list__pictures list__pictures--body'>
						{product.pictures.map((img, i) => (
							<img src={img} key={i} alt='anh' className='img' />
						))}
					</div>
					<div className='list__cate list__cate--body'>
						<p>
							{categories.find(
								(cate) => cate._id === product.category
							)
								? categories.find(
										(cate) => cate._id === product.category
								  ).name
								: ""}
						</p>
					</div>
					<div className='list__price list__price--body'>
						<p>
							{product.price.toLocaleString()} <sup>??</sup>
						</p>
					</div>
					<div className='list__origin list__origin--body'>
						<p>{product.country}</p>
					</div>
					<div className='list__action list__action--body'>
						<Link to={pathname + `/edit/${product._id}`}>
							<Button className='list__action__btn shadow-none'>
								S???a
							</Button>
						</Link>
						<Button
							className='list__action__btn shadow-none'
							onClick={() => handleDeleteItem(product._id)}>
							X??a
						</Button>
					</div>
				</div>
			))
		);
	};

	return (
		<div className='list-product shadow-sm'>
			<div className='list-product__header'>
				<h2>T???t c??? s???n ph???m</h2>
			</div>

			<div className='list-product__action'>
				<div className='list-product__action__header'>
					<h3>{total} s???n ph???m</h3>
					<p
						className={cls({
							"list-product__action__header__selected": true,
							"list-product__action__header__selected--visible":
								checkList.length > 0,
						})}>
						{checkList.length} s???n ph???m ???????c ch???n
					</p>
					<p
						onClick={() => handleDeleteSelectedItem(checkList)}
						className={cls({
							"list-product__action__header__delete": true,
							"list-product__action__header__delete--visible":
								checkList.length > 0,
						})}>
						X??a c??c s???n ph???m
					</p>
				</div>

				<div className='filter'>
					<Link to={pathname + "/add"}>
						<Button className='shadow-none list-product__action__add'>
							<i className='fas fa-plus'></i>
							Th??m 1 s???n ph???m m???i
						</Button>
					</Link>
					<div className='filter-task'>
						<i className='fas fa-filter'></i>

						<ul className='filter-task__list shadow-lg'>
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
									Gi?? t??? cao ?????n th???p
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
									Gi?? t??? th???p ?????n cao{" "}
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
									T??n t??? A - Z{" "}
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
									T??n t??? Z - S{" "}
									<i className='fas fa-sort-alpha-up'></i>
								</NavLink>
							</li>
						</ul>
					</div>

					<div className='limit'>
						<p>S??? s???n ph???m tr??n 1 trang</p>
						<Select
							placeholder='S??? s???n ph???m tr??n 1 trang'
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

					<div className='view'>
						<div
							className={cls({
								"view__item ": true,
								active: view,
							})}
							onClick={() => setView(true)}>
							<i className='fas fa-list'></i>
						</div>
						<div
							className={cls({
								"view__item ": true,
								active: !view,
							})}
							onClick={() => setView(false)}>
							<i className='fas fa-th-large'></i>
						</div>
					</div>
				</div>
			</div>

			<div
				className={cls({
					list: true,
					"list--no-border": !view,
				})}>
				<div
					className={cls({
						list__header: true,
						"list__header--hidden": !view,
					})}>
					<div className='list__checkbox'>
						<Input
							type='checkbox'
							name='checkAll'
							value={
								products ? products.map((item) => item._id) : ""
							}
							onChange={handleCheck}
							className='check-input shadow-none'
						/>
					</div>
					<div className='list__name'>
						<p>T??n s???n ph???m</p>
					</div>
					<div className='list__pictures'>
						<p>???nh minh h???a</p>
					</div>
					<div className='list__cate'>
						<p>Ph??n lo???i h??ng</p>
					</div>
					<div className='list__price'>
						<p>Gi??</p>
					</div>
					<div className='list__origin'>
						<p>Xu???t s???</p>
					</div>
					<div className='list__action'>
						<p>H??nh ?????ng</p>
					</div>
				</div>
				<div className='list__body'>{renderListProduct()}</div>
			</div>

			<Pagination location={location} />
		</div>
	);
}

export default ProductsList;
