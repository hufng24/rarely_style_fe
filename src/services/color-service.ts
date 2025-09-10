import { BASE_URL } from "@/constant/base";
import { BaseResponse } from "@/types/response/base-response";
import { ColorResponse } from "@/types/response/color-response";
import useFetch from "react-fetch-hook";

export const getColor = () =>{
   return useFetch<BaseResponse<ColorResponse>>(`${BASE_URL}/colors`)
}