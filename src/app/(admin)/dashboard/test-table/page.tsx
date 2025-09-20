"use client";

import {
  ApiResponse,
  TableColumn,
} from "@/components/customs/table-custom/api";
import { DataTable } from "@/components/customs/table-custom/data-table";
import { BASE_URL } from "@/constant/base";
import {
  deleteColor,
  getColor,
  getColors,
  updateColor,
} from "@/services/color-service";
import { ColorResponse } from "@/types/response/color-response";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { ModalForm } from "@/components/customs/form-builder/ModalForm";
import { FieldConfig } from "@/components/customs/form-builder/types";

export default function TestTable() {
  const columns: TableColumn<ColorResponse>[] = [
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

  const colorService = async (params: {
    page: number;
    size: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<ColorResponse>> => {
    const query = new URLSearchParams({
      page: String(params.page),
      size: String(params.size),
      search: params.search || "",
      sortBy: params.sortBy || "",
      sortOrder: params.sortOrder || "asc",
    });

    const res = await fetch(`${BASE_URL}/colors?${query.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // tránh cache khi server render
    });

    if (!res.ok) {
      throw new Error("Failed to fetch colors");
    }

    const data: ApiResponse<ColorResponse> = await res.json();
    return data;
  };
  // Modal form state for edit
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState<Partial<ColorResponse>>({});
  const [refreshKey, setRefreshKey] = useState(0);

  const formFields: FieldConfig<ColorResponse>[] = [
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
      type: "combobox",
      name: "hungId",
      label: "Thương hiệu",
      placeholder: "Chọn thương hiệu",
      apiUrl: `${BASE_URL}/colors`,
      searchPlaceholder: "Tìm kiếm thương hiệu...",
      emptyText: "Không tìm thấy thương hiệu nào",
      searchParam: "search",
      pageParam: "page",
      limitParam: "size",
      pageSize: 10,
      transformResponse: (response: any) => ({
        data:
          response.data?.map((item: any) => ({
            value: String(item.id),
            label: item.name,
          })) || [],
        hasMore: response.totalPages > response.page + 1,
      }),
      rules: {
        required: true,
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
      // disabled: true
    },
  ];

  const handleEdit = (record: ColorResponse) => {
    setFormValues(record);
    setOpen(true);
  };

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submit edit:", formValues);

      const res = await updateColor(formValues.id as number, formValues);
      console.log("Update color:", res);
      setOpen(false);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const handleDelete = async (user: any) => {
    try {
      console.log("Deleting user:", user);
      console.log("Deleting user By Id:", user.id);
      await deleteColor(user.id);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  return (
    <div>
      <DataTable
        reloadKey={refreshKey}
        columns={columns}
        service={colorService}
        pageSize={5}
        searchPlaceholder="Tim kiem theo ma hoac ten"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ModalForm
        open={open}
        title="Chỉnh sửa màu sắc"
        onOpenChange={setOpen}
        values={formValues as ColorResponse}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fields={formFields}
        columns={1}
      />


    </div>
  );
}
