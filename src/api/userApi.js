import axiosClient from "./axiosClient";

const userApi = {
	register: (data) => {
		const url = "auth/register/";
		return axiosClient.post(url, data);
	},
	confirm: (id) => {
		const url = `auth/confirm/${id}`;
		return axiosClient.get(url);
	},
	login: (data) => {
		const url = "auth/login/";
		return axiosClient.post(url, data);
	},
	forgetPassword: (email) => {
		const url = "auth/forget-password/";
		return axiosClient.post(url, email);
	},
	resetPassword: (data) => {
		const url = "auth/reset-password/";
		return axiosClient.post(url, data);
	},
};

export default userApi;
