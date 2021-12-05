import axiosClient from "./axiosClient";

const baseUrl = "auth/";

const userApi = {
	register: (data) => {
		const url = baseUrl + "register";
		return axiosClient.post(url, data);
	},
	confirm: (id) => {
		const url = `${baseUrl}confirm/${id}`;
		return axiosClient.get(url);
	},
	login: (data) => {
		const url = baseUrl + "login";
		return axiosClient.post(url, data);
	},
	forgetPassword: (email) => {
		const url = baseUrl + "forget-password";
		return axiosClient.post(url, email);
	},
	resetPassword: (data) => {
		const url = baseUrl + "reset-password";
		return axiosClient.post(url, data);
	},
	getAccessToken: (refreshToken) => {
		const url = baseUrl + "access-token";
		return axiosClient.post(url, { refreshToken });
	},
	getUser: () => {
		return axiosClient.get(baseUrl);
	},
	updateUser: (data) => {
		return axiosClient.put(baseUrl, data);
	},
	changePassword: (data) => {
		const url = baseUrl + "change-password";
		return axiosClient.put(url, data);
	},
};

export default userApi;
