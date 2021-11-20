import axiosClient from "./axiosClient";

const baseUrl = "products";
const productsApi = {
	createProduct: (data) => {
		return axiosClient.post(baseUrl, data);
	},
	updateProduct: (id, newData) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.put(url, newData);
	},
	getAllProduct: () => {
		return axiosClient.get(baseUrl);
	},
	getProduct: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.get(url);
	},
	deleteProduct: (id) => {
		const url = `${baseUrl}/${id}`;
		return axiosClient.delete(url);
	},
	deleteAllProduct: () => {
		return axiosClient.delete(baseUrl);
	},
};

export default productsApi;