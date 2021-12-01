export const findCategories = (id, categories) => {
	return categories.find((item) => item._id === id);
};
