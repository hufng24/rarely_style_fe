"use client";

import { ModalForm } from "@/components/customs/form-builder/ModalForm";
import { FieldConfig } from "@/components/customs/form-builder/types";
import {
  ApiResponse,
  TableColumn,
} from "@/components/customs/table-custom/api";
import { DataTable } from "@/components/customs/table-custom/data-table";
import { BASE_URL } from "@/constant/base";
import { formatDate } from "@/lib/utils";
import { deleteSize, updateSize } from "@/services/size-service";
import { SizeResponse } from "@/types/response/size-response";
import { useState } from "react";

export default function SizePage() {
  const columns: TableColumn<SizeResponse>[] = [
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
  const sizeService = async (params: {
    page: number;
    size: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<SizeResponse>> => {
    const query = new URLSearchParams({
      page: String(params.page),
      size: String(params.size),
      search: params.search || "",
      sortBy: params.sortBy || "",
      sortOrder: params.sortOrder || "asc",
    });

    const res = await fetch(`${BASE_URL}/sizes?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // tránh cache khi server render
    });

    if (!res.ok) {
      throw new Error("Failed to fetch sizes");
    }

    const data: ApiResponse<SizeResponse> = await res.json();
    return data;
  };

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Partial<SizeResponse>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  const formFields: FieldConfig<SizeResponse>[] = [
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
  const handleSubmit = async() => {
    try {
      console.log("Submit edit:", formValues)
      const res = await updateSize(formValues.id as number, formValues)
      console.log("Update size:", res)
      setOpen(false)
      setRefreshKey((k) => k + 1)
    } catch (e) {
      console.error("Update failed", e)
    }
  }

  const handleEdit = (record: SizeResponse) => {
    setFormValues(record)
    setOpen(true)
  }

  const handleDelete = async (record: SizeResponse) => {
    try {
      console.log("Deleting size:", record)
      console.log("Deleting size By Id:", record.id)
      await deleteSize(record.id)
      setRefreshKey((k) => k + 1)
    } catch (e) {
      console.error("Delete failed", e)
    }
  }


  return (
    <div>
      <DataTable 
      reloadKey={refreshKey}
      columns={columns} 
      service={sizeService} 
      pageSize={5}
      searchPlaceholder="Tìm kiếm theo mã hoặc tên"
      onEdit={handleEdit}
      onDelete={handleDelete}
      />

      <ModalForm
        open={open}
        title="Chỉnh sửa kích cỡ"
        onOpenChange={setOpen}
        values={formValues as SizeResponse}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fields={formFields}
        columns={1}
      />
    </div>
  );
}
