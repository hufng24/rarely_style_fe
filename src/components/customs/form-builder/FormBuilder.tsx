"use client"

import { DynamicField } from "./DynamicField"
import { FieldConfig, FormBuilderProps } from "./types"
import { cn } from "@/lib/utils"

export function FormBuilder<TFormValues extends Record<string, any>>({ values, onChange, fields, columns = 1, gap = "1rem" }: FormBuilderProps<TFormValues>) {
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap,
  }

  return (
    <div style={gridStyle} className="w-full">
      {fields.map((field) => (
        <DynamicField
          key={String(field.name)}
          field={field}
          value={values[String(field.name)]}
          onChange={onChange}
        />
      ))}
    </div>
  )
}


