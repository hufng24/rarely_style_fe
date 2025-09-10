export interface BaseResponse<T> {
    data: T[] | [];
    metadata?: Metadata
}

export interface Metadata {
    page: number;
        size: number;
        totalPage: number;
        total: number;
}