import { fetchOrders } from "app/purchaseSlide";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cls from "classnames";
import { Input } from "reactstrap";

function Purchase() {
	const dispatch = useDispatch();
	const [active, setActive] = useState({
		item: 0,
		style: {
			left: 0,
			width: 0,
		},
	});
	const [focus, setFocus] = useState(false);

	const firstItem = useRef();

	useEffect(() => {
		dispatch(fetchOrders());
		setActive((prev) => ({
			...prev,
			item: 0,
			style: {
				left: 0,
				width: firstItem.current.offsetWidth,
			},
		}));
	}, [dispatch]);

	const handleActiveTab = (e, item) => {
		setActive((prev) => ({
			...prev,
			item,
			style: {
				left: e.target.offsetLeft,
				width: e.target.offsetWidth,
			},
		}));
	};

	return (
		<div className='user__purchase'>
			<div className='user__purchase__header'>
				<ul className='user__purchase__header__tab'>
					<li
						className='user__purchase__header__item'
						ref={firstItem}
						onClick={(e) => handleActiveTab(e, 0)}>
						<Link
							to='/user/purchase?1'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 0,
							})}>
							Tất cả
						</Link>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 1)}>
						<Link
							to='/user/purchase?'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 1,
							})}>
							Chờ xác nhận
						</Link>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 2)}>
						<Link
							to='/user/purchase?'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 2,
							})}>
							Chờ lấy hàng
						</Link>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 3)}>
						<Link
							to='/user/purchase?'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 3,
							})}>
							Đang giao
						</Link>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 4)}>
						<Link
							to='/user/purchase?'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 4,
							})}>
							Đã giao
						</Link>
					</li>
					<li
						className='user__purchase__header__item'
						onClick={(e) => handleActiveTab(e, 5)}>
						<Link
							to='/user/purchase?'
							className={cls({
								user__purchase__header__link: true,
								active: active.item === 5,
							})}>
							Đã hủy
						</Link>
					</li>
					<div
						className='user__purchase__header__line'
						style={active.style}></div>
				</ul>
			</div>

			<div
				className={cls({
					user__purchase__search: true,
					"d-none": active.item !== 0,
				})}>
				<i
					className='fas fa-search user__purchase__search__icon'
					style={{ color: focus ? "#555" : "#bbb" }}></i>
				<Input
					type='text'
					placeholder='Tìm kiếm theo Tên Shop, ID đơn hàng hoặc Tên Sản phẩm'
					className='shadow-none user__purchase__search__input'
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
			</div>
		</div>
	);
}

export default Purchase;
