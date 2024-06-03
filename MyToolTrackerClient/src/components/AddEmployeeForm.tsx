import { z } from "zod";
import { useState, useEffect } from "react";
import { EmployeeType } from "@/types/employeeType";
import { EmployeeService } from "@/services/employeeService";
import { FormProps } from "@/types/FormProps";
import RecordForm from "./RecordForm";

const employeeService = new EmployeeService();

const schema = z.object({
  firstName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
  idCardNumber: z
    .string()
    .length(10)
    .regex(/^[0-9A-Z]+$/, { message: "Only number and uppercase letters!" }),
  jmbg: z.string().length(13).regex(/^\d+$/),
  contactNumber: z.string().min(9).max(10).regex(/^\d+$/),
  employeeTypeId: z.number().min(1),
});

const inputFields = {
  firstName: { type: "text", label: "First Name" },
  lastName: { type: "text", label: "Last Name" },
  idCardNumber: { type: "text", label: "ID Card Number" },
  jmbg: { type: "text", label: "JMBG" },
  contactNumber: { type: "text", label: "Contact Number" },
  employeeTypeId: { type: "select", label: "Employee Type" },
};

const AddEmployeeForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  const [employeeTypes, setEmployeeTypes] = useState<EmployeeType[]>([]);

  useEffect(() => {
    employeeService.getEmployeeTypes().then((data) => {
      setEmployeeTypes(data);
    });
  }, []);

  const options = {
    employeeTypeId: employeeTypes.map((employeeType) => ({
      value: employeeType.id,
      label: employeeType.name,
    })),
  };

  return (
    <RecordForm
      schema={schema}
      inputFields={inputFields}
      fetchData={fetchData}
      isUpdate={isUpdate}
      defaultValues={defaultValues}
      addRecord={employeeService.createEmployee}
      updateRecord={employeeService.updateEmployee}
      options={options}
      recordType="Employee"
    />
  );
};

export default AddEmployeeForm;
