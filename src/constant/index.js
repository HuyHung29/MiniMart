import logo from "assets/img/logo.png";
import logoBlack from "assets/img/logo_footer.png";
import bgMidHeader from "assets/img/bg_midheader.png";
import bgSearchBtn from "assets/img/bg_search.png";
import bgFooter from "assets/img/bg_footer.png";
import sliderImg from "assets/img/slider_1.jpeg";
import banner1 from "assets/img/banner/banner_1.jpg";
import banner2 from "assets/img/banner/banner_2.jpg";
import banner3 from "assets/img/banner/banner_3.jpg";
import emptyCart from "assets/img/emptyCart.png";

export const images = {
	LOGO: logo,
	LOGO_B: logoBlack,
	BG_MID_HEADER: bgMidHeader,
	BG_SEARCH: bgSearchBtn,
	BG_FOOTER: bgFooter,
	SLIDER_IMG: sliderImg,
	EMPTYCART: emptyCart,
};

export const bannerImg = [banner1, banner2, banner3];

export const breadcrumbNames = {
	register: "Đăng ký tài khoản",
	login: "Đăng nhập tài khoản",
	user: "Trang khách hàng",
	profile: "Hồ sơ",
	password: "Đổi mật khẩu",
	address: "Địa chỉ",
	products: "Sản phẩm",
	add: "Thêm mới",
	edit: "Chỉnh sửa",
	cart: "Giỏ hàng",
	purchase: "Đơn hàng",
};

export const formValidateData = {
	minName: 2,
	minPassword: 6,
	phoneRegex: /^[0-9]{9,}$/,
};

export const itemTitle = {
	title: "Tên sản phẩm",
	pictures: "Ảnh sản phẩm",
	price: "Giá sản phẩm",
	quantity: "Số lượng có",
	country: "Xuất xứ",
	unit: "Đơn vị tính",
	category: "Phân loại",
	description: "Mô tả sản phẩm",
	discount: "Giảm giá",
	createdAt: "Ngày tạo",
	updatedAt: "Ngày cập nhật",
	sellNumber: "Số lượng bán",
};

export const listTitle = [
	"name",
	"title",
	"pictures",
	"price",
	"country",
	"category",
];

export const addressField = {
	name: "Họ và tên",
	phone: "Số điện thoại",
	company: "Công ty",
	city: "Tỉnh/Thành phố",
	district: "Quận/Huyện",
	village: "Phường/Xã",
};
