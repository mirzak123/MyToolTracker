import { Employee } from "@/types/employee";
import { Tool } from "@/types/tool";
import { Company } from "@/types/company";
import { Project } from "@/types/project";

import { GridColDef } from "@mui/x-data-grid";
import { ReactElement } from "react";

type RowData = Employee | Tool | Company | Project;

export type RecordTableProps = {
  records: RowData[];
  columns: GridColDef[];
  onDelete: (id: number) => void;
  fetchData: () => void;
  recordForm: ReactElement;
  recordType: string;
}
