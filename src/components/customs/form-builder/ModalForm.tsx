"use client"

import { FormBuilder } from "./FormBuilder"
import { FieldConfig } from "./types"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalFormProps<TFormValues extends Record<string, any> = Record<string, any>> {
  open: boolean
  title?: string
  onOpenChange: (open: boolean) => void
  values: TFormValues
  onChange: (name: string, value: any) => void
  onSubmit: () => void
  onCancel?: () => void
  fields: FieldConfig<TFormValues>[]
  submitText?: string
  cancelText?: string
  columns?: number
}

export function ModalForm<TFormValues extends Record<string, any>>({
  open,
  title = "Form",
  onOpenChange,
  values,
  onChange,
  onSubmit,
  onCancel,
  fields,
  submitText = "Lưu",
  cancelText = "Hủy",
  columns = 2,
}: ModalFormProps<TFormValues>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <FormBuilder values={values} onChange={onChange} fields={fields} columns={columns} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel ?? (() => onOpenChange(false))}>{cancelText}</Button>
          <Button onClick={onSubmit}>{submitText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


