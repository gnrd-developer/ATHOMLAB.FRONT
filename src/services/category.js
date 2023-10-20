import { getApiUrl } from './apiConfig'
import axios from 'axios'


export const getAllCategories = ({ setCategoryList }) => {
    const categoryUrl = getApiUrl("category")
    axios.get(categoryUrl).then((response) => {
        setCategoryList(response.data)
    })
}

export const getSubCategoriesByCategoryName = async (categoryname) => {
    const productUrl = getApiUrl(`subcategory/${categoryname}`)
    const response = await axios.get(productUrl)
    return response.data
}


export const getAllSubCategories = ({ setSubCategoryList }) => {
    const categoryUrl = getApiUrl("subcategory")
    axios.get(categoryUrl).then((response) => {
        setSubCategoryList(response.data)
    })
}