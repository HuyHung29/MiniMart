import React from "react";
import PropTypes from "prop-types";
import { Pagination as PaginationRT, PaginationItem } from "reactstrap";
import { Link } from "react-router-dom";

Pagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

Pagination.defaultProps = {
	pagination: {},
	location: {},
};

function Pagination({ pagination, location }) {
	const { next, prev, limit, total } = pagination;
	const { pathname, search } = location;

	const numberOfPage = Math.ceil(total / limit);

	const deleteSearch = () => {
		return search.includes("page=")
			? search.substr(0, search.indexOf("page=")) +
					search.substr(search.indexOf("page=") + 6)
			: search + "&";
	};

	const renderPagination = () => {
		const pagination = [];
		for (let i = 1; i <= numberOfPage; ++i) {
			pagination.push(i);
		}

		return pagination.map((item, index) => (
			<PaginationItem
				key={index}
				active={prev + 1 === item || next - 1 === item}>
				<Link
					className='page-link'
					to={`${pathname}${
						search ? deleteSearch() : "?"
					}page=${item}`}
					onClick={(e) => {
						if (prev + 1 === item || next - 1 === item) {
							e.preventDefault();
						}
					}}>
					{item}
				</Link>
			</PaginationItem>
		));
	};

	return (
		<PaginationRT size='lg'>
			<PaginationItem disabled={prev ? false : true}>
				<Link
					className='page-link'
					aria-label='Previous'
					to={`${pathname}${
						search ? deleteSearch() : "?"
					}page=${prev}`}
					onClick={(e) => {
						if (!prev) e.preventDefault();
					}}>
					{" "}
					<span aria-hidden='true'>&laquo;</span>
				</Link>
			</PaginationItem>
			{renderPagination()}
			<PaginationItem disabled={next ? false : true}>
				<Link
					className='page-link'
					aria-label='Next'
					to={`${pathname}${
						search ? deleteSearch() : "?"
					}page=${next}`}
					onClick={(e) => {
						if (!next) e.preventDefault();
					}}>
					<span aria-hidden='true'>&raquo;</span>
				</Link>
			</PaginationItem>
		</PaginationRT>
	);
}

export default Pagination;
