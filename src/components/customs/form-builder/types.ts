export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "combobox"
  | "date";

export interface OptionItem {
  label: string
  value: string | number | boolean
}

export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface BaseFieldConfig<TFormValues extends Record<string, any> = Record<string, any>> {
  name: keyof TFormValues | string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
  required?: boolean
  hidden?: boolean
  className?: string
  rules?: ValidationRule
}

export interface TextFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "text" | "number" | "textarea"
}

export interface SelectFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "select" | "combobox"
  options: OptionItem[]
}

export interface RadioFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "radio"
  options: OptionItem[]
}

export interface CheckboxFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "checkbox"
}

export interface DateFieldConfig<T extends Record<string, any>> extends BaseFieldConfig<T> {
  type: "date"
}

export type FieldConfig<T extends Record<string, any>> =
  | TextFieldConfig<T>
  | SelectFieldConfig<T>
  | RadioFieldConfig<T>
  | CheckboxFieldConfig<T>
  | DateFieldConfig<T>

export interface FormBuilderProps<TFormValues extends Record<string, any> = Record<string, any>> {
  values: TFormValues
  onChange: (name: string, value: any) => void
  fields: FieldConfig<TFormValues>[]
  columns?: number
  gap?: string
}


