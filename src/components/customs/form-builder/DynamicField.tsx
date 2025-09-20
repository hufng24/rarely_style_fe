"use client"

import { FieldConfig, OptionItem, ValidationRule } from "./types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ApiCombobox } from "@/components/customs/combo-box/api-combobox"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface DynamicFieldProps<TFormValues extends Record<string, any> = Record<string, any>> {
  field: FieldConfig<TFormValues>
  value: any
  onChange: (name: string, value: any) => void
  error?: string
}

// Validation function
const validateField = (value: any, rules?: ValidationRule): string | null => {
  if (!rules) return null

  if (rules.required && (value === undefined || value === null || value === "")) {
    return "Trường này là bắt buộc"
  }

  if (value === undefined || value === null || value === "") return null

  if (rules.min !== undefined && typeof value === "number" && value < rules.min) {
    return `Giá trị phải lớn hơn hoặc bằng ${rules.min}`
  }

  if (rules.max !== undefined && typeof value === "number" && value > rules.max) {
    return `Giá trị phải nhỏ hơn hoặc bằng ${rules.max}`
  }

  if (rules.minLength !== undefined && typeof value === "string" && value.length < rules.minLength) {
    return `Độ dài tối thiểu là ${rules.minLength} ký tự`
  }

  if (rules.maxLength !== undefined && typeof value === "string" && value.length > rules.maxLength) {
    return `Độ dài tối đa là ${rules.maxLength} ký tự`
  }

  if (rules.pattern && typeof value === "string" && !rules.pattern.test(value)) {
    return "Định dạng không hợp lệ"
  }

  if (rules.custom) {
    return rules.custom(value)
  }

  return null
}

export function DynamicField<TFormValues extends Record<string, any>>({ field, value, onChange, error }: DynamicFieldProps<TFormValues>) {
  if (field.hidden) return null

  const name = String(field.name)
  const [fieldError, setFieldError] = useState<string | null>(error || null)

  // Validate on value change
  useEffect(() => {
    const validationError = validateField(value, field.rules)
    setFieldError(validationError)
  }, [value, field.rules])

  const handleChange = (newValue: any) => {
    onChange(name, newValue)
  }

  const renderOptions = (options: OptionItem[]) =>
    options.map((opt) => (
      <SelectItem key={String(opt.value)} value={String(opt.value)}>
        {opt.label}
      </SelectItem>
    ))

  const isRequired = field.required || field.rules?.required

  return (
    <div className={cn("space-y-2 w-full", field.className)}>
      {field.label && (
        <Label htmlFor={name} className={cn(fieldError && "text-destructive")}>
          {field.label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {field.description && (
        <p className="text-sm text-muted-foreground">{field.description}</p>
      )}

      {field.type === "text" && (
        <Input 
          id={name} 
          placeholder={field.placeholder} 
          disabled={field.disabled} 
          value={value ?? ""} 
          onChange={(e) => handleChange(e.target.value)}
          className={cn(fieldError && "border-destructive")}
        />
      )}

      {field.type === "number" && (
        <Input 
          id={name} 
          type="number" 
          placeholder={field.placeholder} 
          disabled={field.disabled} 
          value={value ?? ""} 
          onChange={(e) => handleChange(e.target.value === "" ? undefined : Number(e.target.value))}
          className={cn(fieldError && "border-destructive")}
        />
      )}

      {field.type === "textarea" && (
        <Textarea 
          id={name} 
          placeholder={field.placeholder} 
          disabled={field.disabled} 
          value={value ?? ""} 
          onChange={(e) => handleChange(e.target.value)}
          className={cn(fieldError && "border-destructive")}
        />
      )}

      {field.type === "select" && "options" in field && (
        <Select value={value !== undefined && value !== null ? String(value) : undefined} onValueChange={handleChange}>
          <SelectTrigger id={name} disabled={field.disabled} className={cn(fieldError && "border-destructive")}>
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {renderOptions(field.options)}
          </SelectContent>
        </Select>
      )}

      {field.type === "radio" && "options" in field && (
        <RadioGroup value={value !== undefined && value !== null ? String(value) : undefined} onValueChange={handleChange} className="flex flex-wrap gap-4">
          {field.options.map((opt) => (
            <div key={String(opt.value)} className="flex items-center space-x-2">
              <RadioGroupItem id={`${name}-${opt.value}`} value={String(opt.value)} />
              <Label htmlFor={`${name}-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {field.type === "checkbox" && (
        <div className="flex items-center space-x-2">
          <Checkbox id={name} checked={Boolean(value)} onCheckedChange={(checked) => handleChange(Boolean(checked))} disabled={field.disabled} />
          {field.placeholder && <Label htmlFor={name}>{field.placeholder}</Label>}
        </div>
      )}

      {field.type === "combobox" && "apiUrl" in field && (
        <ApiCombobox
          apiUrl={field.apiUrl}
          placeholder={field.placeholder}
          searchPlaceholder={field.searchPlaceholder}
          emptyText={field.emptyText}
          value={value !== undefined && value !== null ? String(value) : undefined}
          onChange={(selectedValue, option) => handleChange(selectedValue)}
          disabled={field.disabled}
          className={cn(fieldError && "border-destructive")}
          searchParam={field.searchParam}
          pageParam={field.pageParam}
          limitParam={field.limitParam}
          pageSize={field.pageSize}
          transformResponse={field.transformResponse}
          additionalParams={field.additionalParams}
          headers={field.headers}
        />
      )}

      {field.type === "date" && (
        <Input 
          id={name} 
          type="date" 
          placeholder={field.placeholder} 
          disabled={field.disabled} 
          value={value ? (typeof value === "string" ? value : new Date(value).toISOString().split('T')[0]) : ""} 
          onChange={(e) => handleChange(e.target.value)}
          className={cn(fieldError && "border-destructive")}
        />
      )}

      {fieldError && (
        <p className="text-sm text-destructive">{fieldError}</p>
      )}
    </div>
  )
}


