"use client";

import { useState, useEffect } from "react";
import { z } from "zod";

import { ToolStatus } from "@/types/toolStatus";
import { Category } from "@/types/category";
import { ToolService } from "@/services/toolService";
import { CategoryService } from "@/services/categoryService";
import { FormProps } from "@/types/FormProps";
import RecordForm from "./RecordForm";

const toolService = new ToolService();
const categoryService = new CategoryService();

const schema = z.object({
  name: z.string().min(3).max(100),
  barcode: z.string().length(12).regex(/^\d+$/),
  price: z.number().min(0),
  categoryId: z.number().min(1),
  model: z.string(),
  manufacturer: z.string(),
  toolStatusId: z.number().min(1),
});

const inputFields = {
  name: { type: "text", label: "Name" },
  barcode: { type: "text", label: "Barcode (12 digits)" },
  price: { type: "number", label: "Price" },
  model: { type: "text", label: "Model" },
  manufacturer: { type: "text", label: "Manufacturer" },
  categoryId: { type: "select", label: "Category" },
  toolStatusId: { type: "select", label: "Tool Status" },
};

const AddToolForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  const [toolStatuses, setToolStatuses] = useState<ToolStatus[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    toolService.getToolStatuses().then((data: ToolStatus[]) => {
      setToolStatuses(data);
    });

    categoryService.getCategories().then((data: Category[]) => {
      setCategories(data);
    });
  }, []);

  const options = {
    toolStatusId: toolStatuses.map((toolStatus) => ({
      value: toolStatus.id,
      label: toolStatus.name,
    })),
    categoryId: categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  };

  return (
    <RecordForm
      schema={schema}
      inputFields={inputFields}
      fetchData={fetchData}
      isUpdate={isUpdate}
      defaultValues={defaultValues}
      addRecord={toolService.createTool}
      updateRecord={toolService.updateTool}
      options={options}
      recordType="Tool"
    />
  );
};

export default AddToolForm;
