import { BASE_URL } from "@/constant/base"
import { BaseResponse } from "@/types/response/base-response"
import { MaterialResponse } from "@/types/response/material-response"
import axios from "axios"
import useFetch from "react-fetch-hook"

export const getAllMaterial = () =>{
   return useFetch<BaseResponse<MaterialResponse>>(`${BASE_URL}/bransds`)
}
export const getAllMaterials = (params: {
    page: number
    size: number
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}) =>{
    return useFetch<BaseResponse<MaterialResponse>>(`${BASE_URL}/materials?${params}`)
}


export const updateMaterial = (id: number, data: any) =>{
    return axios.put(`${BASE_URL}/materials/${id}`, data)
}

export const deleteMaterial = (id: number) =>{
    return axios.delete(`${BASE_URL}/materials/${id}`)
}