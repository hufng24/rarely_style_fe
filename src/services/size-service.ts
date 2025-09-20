import { BASE_URL } from "@/constant/base"
import { BaseResponse } from "@/types/response/base-response"
import { SizeResponse } from "@/types/response/size-response"
import axios from "axios"
import useFetch from "react-fetch-hook"



export const getAllSize = () =>{
    return useFetch<BaseResponse<SizeResponse>>(`${BASE_URL}/sizes`)
 }

export const getAllSizes = (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}) =>{
    return useFetch<BaseResponse<SizeResponse>>(`${BASE_URL}/sizes?${params}`)
}

export const updateSize = (id: number, data: any) =>{
    return axios.put(`${BASE_URL}/sizes/${id}`, data)
}

export const deleteSize = (id: number) =>{
    return axios.delete(`${BASE_URL}/sizes/${id}`)
}

 