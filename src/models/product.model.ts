
export interface FormField {
  type: 'text' | 'select' | 'textarea';
  name: string;
  label: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface Product {
  key: string;
  name: string;
  description: string;
  fields: FormField[];
}
