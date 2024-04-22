import { Employee } from "@/types/employee";
import { Tool } from "@/types/tool";

type DefaultValues = Employee | Tool;

export interface FormProps {
  fetchData?: () => void;
  defaultValues?: DefaultValues;
  isUpdate?: boolean;
}
