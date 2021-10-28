import axios from "axios";

const apiURL= "https://www.themealdb.com/api/json/v1/1/"

const getAllCat = () => {
    return axios.get(apiURL+"/categories.php");
};

const getIndainRecipes = () => {
    return axios.get(apiURL+"/filter.php?a=Indian");
};

const getFilteredByCategory = (category) => {
    return axios.get(apiURL+"/filter.php?c="+category);
};

const getFilteredByCountry = (country) => {
    return axios.get(apiURL+"/filter.php?a="+country);
};

const getSearchedByName = (name) => {
    return axios.get(apiURL+"/search.php?s="+name);
};

const getRecipeById = (id) => {
    return axios.get(apiURL+"/lookup.php?i="+id);
};

const methods = {
    getAllCat,
    getIndainRecipes,
    getFilteredByCategory,
    getSearchedByName,
    getRecipeById,
    getFilteredByCountry
}
export default methods