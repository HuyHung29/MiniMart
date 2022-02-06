import Footer from "components/Footer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import React from "react";

function UiLayout(props) {
	return (
		<div className='layout__content__background'>
			<Header />
			<NavBar />
			{props.children}
			<Footer />
		</div>
	);
}

export default UiLayout;
