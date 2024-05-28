"use client";

import RecordForm from "@/components/RecordForm";
import { z } from "zod";
import { ProjectService } from "@/services/projectService";
import { FormProps } from "@/types/FormProps";

const schema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters").max(100),
  companyId: z.string().min(1),
  contractNumber: z
    .string()
    .min(3, "Contract number must contain at least 3 characters")
    .max(100, "Contract number must contain at most 100 characters"),
  year: z
    .number()
    .min(1900, "Please enter a valid year")
    .max(2100, "Please enter a valid year"),
});

const inputFields = {
  name: { type: "text", label: "Name" },
  companyId: { type: "text", label: "Company ID" },
  contractNumber: { type: "text", label: "Contract Number" },
  year: { type: "number", label: "Year" },
};

const projectService = new ProjectService();

const AddProjectForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  return (
    <RecordForm
      schema={schema}
      inputFields={inputFields}
      fetchData={fetchData}
      isUpdate={isUpdate}
      defaultValues={defaultValues}
      addRecord={projectService.createProject}
      updateRecord={projectService.updateProject}
      recordType="Project"
    />
  );
};

export default AddProjectForm;
