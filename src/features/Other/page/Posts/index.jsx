import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button, Input } from "reactstrap";
import cls from "classnames";
import ReadMore from "components/ReadMore";

function Posts() {
	const posts = useSelector((state) => state.posts.listPosts);
	const { pathname } = useLocation();
	const [checkList, setCheckList] = useState([]);

	const handleDeleteItem = () => {};

	const handleDeleteSelectedItem = () => {};

	const handleCheck = () => {};

	const renderListPost = () => {
		return posts.length === 0 ? (
			<div className='list__body--empty'>
				<p>Không tìm thấy bài viết nào</p>
			</div>
		) : (
			posts.map((post, index) => (
				<div className='list__item' key={index}>
					<div className='list__checkbox list__checkbox--body'>
						<Input
							className='check-input shadow-none'
							type='checkbox'
							name='checkbox'
							value={post._id}
							onChange={handleCheck}
							checked={checkList.includes(post._id)}
						/>
					</div>
					<div className='list__title'>
						<p>{post.title}</p>
					</div>
					<div className='list__pictures list__pictures--body'>
						{post.pictures
							? post.pictures.map((img, i) => (
									<img
										src={img}
										key={i}
										alt='anh'
										className='img'
									/>
							  ))
							: ""}
					</div>
					<div className='list__desc'>
						<ReadMore
							row={4}
							content={post.description}
							readMore={false}
						/>
					</div>

					<div className='list__action list__action--body'>
						<Link to={pathname + `/edit/${post._id}`}>
							<Button className='list__action__btn shadow-none'>
								Sửa
							</Button>
						</Link>
						<Button
							className='list__action__btn shadow-none'
							onClick={() => handleDeleteItem(post._id)}>
							Xóa
						</Button>
					</div>
				</div>
			))
		);
	};

	return (
		<div className='list-product shadow-sm'>
			<div className='list-product__header'>
				<h2>Tất cả bài viết</h2>
			</div>

			<div className='list-product__action'>
				<div className='list-product__action__header'>
					<h3>{posts.length} bài viết</h3>
					<p
						className={cls({
							"list-product__action__header__selected": true,
							"list-product__action__header__selected--visible":
								checkList.length > 0,
						})}>
						{checkList.length} bài viết được chọn
					</p>
					<p
						onClick={() => handleDeleteSelectedItem(checkList)}
						className={cls({
							"list-product__action__header__delete": true,
							"list-product__action__header__delete--visible":
								checkList.length > 0,
						})}>
						Xóa các bài viết
					</p>
				</div>

				<Link className='ms-auto' to={pathname + "/add"}>
					<Button className='shadow-none list-product__action__add'>
						<i className='fas fa-plus'></i>
						Thêm 1 bài viết mới
					</Button>
				</Link>
			</div>

			<div className='list'>
				<div className='list__header'>
					<div className='list__checkbox'>
						<Input
							type='checkbox'
							name='checkAll'
							value={posts ? posts.map((item) => item._id) : ""}
							onChange={handleCheck}
							className='check-input shadow-none'
						/>
					</div>
					<div className='list__title'>
						<p>Tiêu đề bài viết</p>
					</div>
					<div className='list__pictures'>
						<p>Ảnh minh họa</p>
					</div>
					<div className='list__desc text-center'>
						<p>Nội dung</p>
					</div>

					<div className='list__action'>
						<p>Hành động</p>
					</div>
				</div>
				<div className='list__body'>{renderListPost()}</div>
			</div>
		</div>
	);
}

export default Posts;
