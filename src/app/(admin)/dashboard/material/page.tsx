"use client"

import { ModalForm } from "@/components/customs/form-builder/ModalForm";
import { FieldConfig } from "@/components/customs/form-builder/types";
import { ApiResponse, TableColumn } from "@/components/customs/table-custom/api";
import { DataTable } from "@/components/customs/table-custom/data-table";
import { BASE_URL } from "@/constant/base";
import { formatDate } from "@/lib/utils";
import { deleteMaterial, updateMaterial } from "@/services/material-service";
import { MaterialResponse } from "@/types/response/material-response";
import { useState } from "react";

export default function MaterialPage() {
    const columns: TableColumn<MaterialResponse>[] = [
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

    const materialService = async (params: {
        page: number;
        size: number;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }): Promise<ApiResponse<MaterialResponse>> => {
        const query = new URLSearchParams({
            page: String(params.page),
            size: String(params.size),
            search: params.search || "",
            sortBy: params.sortBy || "",
            sortOrder: params.sortOrder || "asc",
        });

        const res = await fetch(`${BASE_URL}/materials?${query.toString()}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store", // tránh cache khi server render
        });

        if (!res.ok) {
            throw new Error("Failed to fetch sizes");
        }

        const data: ApiResponse<MaterialResponse> = await res.json();
        return data;
    };

    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState<Partial<MaterialResponse>>({});
    const [refreshKey, setRefreshKey] = useState(0);

    const formFields: FieldConfig<MaterialResponse>[] = [
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

    const handleEdit = (record: MaterialResponse) => {
        setFormValues(record);
        setOpen(true);
    }
    const handleSubmit = async () => {
        try {
            const res = await updateMaterial(formValues.id!, formValues);
            setOpen(false);
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            console.error("Update failed", error);
        }
    }

    const handleDelete = async (record: MaterialResponse) => {
        try {
            await deleteMaterial(record.id);
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
                service={materialService}
                pageSize={5}
                searchPlaceholder="Tìm kiếm theo mã hoặc tên"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ModalForm
                open={open}
                title="Chỉnh sửa kích cỡ"
                onOpenChange={setOpen}
                values={formValues as MaterialResponse}
                onChange={handleChange}
                onSubmit={handleSubmit}
                fields={formFields}
                columns={1}
            />
        </div>
    )
}