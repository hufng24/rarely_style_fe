import { BASE_URL } from "@/constant/base"
import { BaseResponse } from "@/types/response/base-response"
import { CategoryResponse } from "@/types/response/categories"
import axios from "axios"
import { a } from "framer-motion/client"
import useFetch from "react-fetch-hook"

export const getAllCategory = () => {
    return useFetch<BaseResponse<CategoryResponse>>(`${BASE_URL}/categories`)
}

export const getCategories = (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}) => {
    return useFetch<BaseResponse<CategoryResponse>>(`${BASE_URL}/categories?${params}`)
}

export const deleteCategory = (id: number) => {
    axios.delete(`${BASE_URL}/categories/${id}`)
}

export const updateCategory = (id: number, data: any) => {
    return axios.put(`${BASE_URL}/categories/${id}`, data)
}