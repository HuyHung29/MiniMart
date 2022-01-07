import BreadCrumb from "components/BreadCrumb";
import React from "react";
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
import PropTypes from "prop-types";

NavBar.propTypes = {
	categories: PropTypes.array.isRequired,
};
function NavBar({ categories }) {
	return (
		<div className='navbar--wrap'>
			<Container>
				<Row className='align-items-center'>
					<Col xl='3'>
						<Navbar expand className='py-0'>
							<NavbarToggler />
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
		</div>
	);
}

NavBar.propTypes = {};

export default NavBar;
