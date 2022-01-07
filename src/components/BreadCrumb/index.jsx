import { breadcrumbNames } from "constant";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function BreadCrumb() {
	const location = useLocation();
	const { pathname } = location;

	const renderBreadcrumb = () => {
		const pathNames = pathname.split("/").filter((x) => x);

		if (pathname !== "/") {
			return (
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to='/' className='breadcrumb-item-link'>
							Trang chủ
						</Link>
						<i className='fas fa-caret-right breadcrumb-item-icon'></i>
					</BreadcrumbItem>
					{pathNames.map((name, index) => {
						if (name === "user" && pathname !== "/user") return "";
						if (name === "user" && pathname === "/user") {
							return (
								<BreadcrumbItem key={index} active>
									{breadcrumbNames[name]}
									<i className='fas fa-caret-right breadcrumb-item-icon'></i>
								</BreadcrumbItem>
							);
						}

						return index === pathNames.length - 1 ? (
							<BreadcrumbItem key={index} active>
								{breadcrumbNames[name]
									? breadcrumbNames[name]
									: name.replaceAll("-", " ")}
								<i className='fas fa-caret-right breadcrumb-item-icon'></i>
							</BreadcrumbItem>
						) : (
							<BreadcrumbItem key={index}>
								<Link
									to={`/${name}`}
									className='breadcrumb-item-link'>
									{breadcrumbNames[name]
										? breadcrumbNames[name]
										: name.replaceAll("-", " ")}
								</Link>
								<i className='fas fa-caret-right breadcrumb-item-icon'></i>
							</BreadcrumbItem>
						);
					})}
				</Breadcrumb>
			);
		}
	};

	return <div className='breadcrumb-background'>{renderBreadcrumb()}</div>;
}

export default BreadCrumb;
