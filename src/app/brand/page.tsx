"use client"

import { ModalForm } from "@/components/customs/form-builder/ModalForm";
import { FieldConfig } from "@/components/customs/form-builder/types";
import { ApiResponse, TableColumn } from "@/components/customs/table-custom/api";
import { DataTable } from "@/components/customs/table-custom/data-table";
import { BASE_URL } from "@/constant/base";
import { formatDate } from "@/lib/utils";
import { deleteBrand, updateBrand } from "@/services/brand-service";
import { BrandResponse } from "@/types/response/brand-respones";
import { useState } from "react";

export default function BrandPage() {
    const columns: TableColumn<BrandResponse>[] = [
        {
            key: "id",
            title: "ID",
            sortable: true,
            width: "80px",
        },
        {
            key: "code",
            title: "Mã",
            sortable: true,
            searchable: true,
        },
        {
            key: "name",
            title: "Tên",
            sortable: true,
            searchable: true,
        },
        {
            key: "createdAt",
            title: "Ngày tạo",
            sortable: true,
            render: (value) => formatDate(value),
        },
    ];

    const brandService = async (params: {
        page: number;
        size: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<ApiResponse<BrandResponse>> => {
        const query = new URLSearchParams({
            page: String(params.page),
            size: String(params.size),
            search: params.search || "",
            sortBy: params.sortBy || "",
            sortOrder: params.sortOrder || "asc",
        });

        const res = await fetch(`${BASE_URL}/brands?${query.toString()}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: ApiResponse<BrandResponse> = await res.json();
        return data;
    }
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState<Partial<BrandResponse>>({});
    const [refreshKey, setRefreshKey] = useState(0);

    const formFields: FieldConfig<BrandResponse>[] = [
        {
            type: "text",
            name: "code",
            label: "Mã",
            required: true,
            placeholder: "Nhập mã",
            rules: {
                required: true,
                minLength: 2,
                maxLength: 10,
                custom: (value) => {
                    if (value && value.includes(" ")) {
                        return "Mã không được chứa khoảng trắng";
                    }
                    return null;
                },
            },
        },
        {
            type: "text",
            name: "name",
            label: "Tên",
            required: true,
            placeholder: "Nhập tên",
            rules: {
                required: true,
                minLength: 2,
                maxLength: 50,
            },
        },
        {
            type: "date",
            name: "createdAt",
            label: "Ngày tạo",
            required: true,
            placeholder: "Ngày tạo",
        },
    ]

    const handleChange = (name: string, value: any) => {
        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    const handleEdit = (record: BrandResponse) => {
        setFormValues(record);
        setOpen(true);
    }
    const handleSubmit = async () => {
        try {
            const res = await updateBrand(formValues.id!, formValues);
        setOpen(false);
        setRefreshKey((prev) => prev + 1);
        } catch (e) {
            console.error("Update failed", e);
        }
    }

    const handleDelete = async (record: BrandResponse) => {
        try {
            await deleteBrand(record.id);
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            console.error("Delete failed", error);
        }
    }



    return (
        <div>
            <DataTable
                reloadKey={refreshKey}
                columns={columns}
                service={brandService}
                pageSize={5}
                searchPlaceholder="Tìm kiếm theo mã hoặc tên"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ModalForm
                open={open}
                title="Chỉnh sửa kích cỡ"
                onOpenChange={setOpen}
                values={formValues as BrandResponse}
                onChange={handleChange}
                onSubmit={handleSubmit}
                fields={formFields}
                columns={1}
            />
        </div>
    );
}