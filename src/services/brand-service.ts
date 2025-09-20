import { BASE_URL } from "@/constant/base"
import { BaseResponse } from "@/types/response/base-response"
import { BrandResponse } from "@/types/response/brand-respones"
import axios from "axios"
import useFetch from "react-fetch-hook"

export const getAllBrands = () => {
    return useFetch<BaseResponse<BrandResponse>>(`${BASE_URL}/brands`)
}
export const getBrands = (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}) => {
    const query = new URLSearchParams()
    query.append("page", params.page.toString())
    query.append("size", params.size.toString())
    if (params.search) query.append("search", params.search)
    if (params.sortBy) query.append("sortBy", params.sortBy)
    if (params.sortOrder) query.append("sortOrder", params.sortOrder)
    return useFetch<BaseResponse<BrandResponse>>(`${BASE_URL}/brands?${query.toString()}`)
}

export const deleteBrand = (id: number) => {
    return fetch(`${BASE_URL}/brands/${id}`, {
        method: "DELETE",
    })
}

export const updateBrand = (id: number, data: any) => {
    const res = axios.put(`${BASE_URL}/brands/${id}`, data)
    return res
}