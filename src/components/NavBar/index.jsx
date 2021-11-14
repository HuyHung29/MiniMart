import categoriesApi from "api/categoriesApi";
import BreadCrumb from "components/BreadCrumb";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	Col,
	Collapse,
	Container,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarToggler,
	Row,
	UncontrolledDropdown,
} from "reactstrap";

function NavBar(props) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const result = await categoriesApi.getAllCategory();
				const { categories } = result.data;
				setCategories(categories);
			} catch (error) {
				toast.error("Ko lay duoc du lieu");
			}
		};

		fetchCategories();
	}, []);

	return (
		<Container>
			<Row className='align-items-center'>
				<Col xl='3'>
					<Navbar expand className='py-0'>
						<NavbarToggler
							onClick={() => {
								console.log("click");
							}}
						/>
						<Collapse navbar>
							<Nav navbar className='w-100'>
								<UncontrolledDropdown inNavbar nav>
									<DropdownToggle nav>
										<i className='fas fa-bars nav__icon'></i>
										Danh mục
									</DropdownToggle>
									<DropdownMenu end>
										{categories.map((item, index) => {
											return (
												<DropdownItem key={index}>
													{item.name}
												</DropdownItem>
											);
										})}
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Collapse>
					</Navbar>
				</Col>
				<Col>
					<BreadCrumb />
				</Col>
			</Row>
		</Container>
	);
}

NavBar.propTypes = {};

export default NavBar;
