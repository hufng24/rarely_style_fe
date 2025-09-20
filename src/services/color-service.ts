import { ApiResponse } from "@/components/customs/table-custom/api";
import { BASE_URL } from "@/constant/base";
import { BaseResponse } from "@/types/response/base-response";
import { ColorResponse } from "@/types/response/color-response";
import axios from "axios";
import useFetch from "react-fetch-hook";

export const getColor = () =>{
   return useFetch<BaseResponse<ColorResponse>>(`${BASE_URL}/colors`)
}


export const getColors = (params: {
  page: number
  size: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}) =>{
   return useFetch<Promise<ApiResponse<ColorResponse>>>(`${BASE_URL}/colors/${params}`)
}

export const deleteColor = (id: number) =>{
   axios.delete(`${BASE_URL}/colors/${id}`)
}

export const updateColor = (id: number, data: any) =>{
  const res =  axios.put(`${BASE_URL}/colors/${id}`, data)
  return res
}