import BreadCrumb from "components/BreadCrumb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Col,
	Collapse,
	Container,
	DropdownItem,
	DropdownMenu,
	Nav,
	Navbar,
	NavbarToggler,
	Row,
	UncontrolledDropdown,
} from "reactstrap";

function NavBar() {
	const categories = useSelector((state) => state.categories);

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
										<Link
											to='/products'
											className='nav-link'>
											<i className='fas fa-bars nav__icon'></i>
											Danh mục
										</Link>
										<DropdownMenu end>
											{categories.map((item, index) => {
												return (
													<DropdownItem key={index}>
														<Link
															to={`/${item.name}`}>
															{item.name}
														</Link>
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
