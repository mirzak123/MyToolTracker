import { Employee } from "@/types/employee";
import { Tool } from "@/types/tool";
import { Company } from "@/types/company";
import { Project } from "@/types/project";
import { OrderRequest } from "@/types/orderRequest";

import { GridColDef } from "@mui/x-data-grid";

type RowData = Employee | Tool | Company | Project | OrderRequest;

export type RecordTableProps = {
  records: RowData[];
  columns: GridColDef[];
  onDelete: (id: number) => void;
  fetchData: () => void;
  recordType: string;
};
