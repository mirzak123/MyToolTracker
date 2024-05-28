"use client";

import { useEffect, useState } from "react";
import RecordForm from "@/components/RecordForm";
import { z } from "zod";
import { CompanyService } from "@/services/companyService";
import { CompanyType } from "@/types/companyType";
import { FormProps } from "@/types/FormProps";

const schema = z.object({
  name: z.string().min(3).max(100),
  phoneNumber: z.string().min(9).max(10).regex(/^\d+$/),
  address: z.string().min(3).max(100),
  contactPerson: z.string().min(3).max(100),
  contactPersonPhoneNumber: z.string().min(9).max(10).regex(/^\d+$/),
  email: z.string().email(),
  companyTypeId: z.number().min(1),
});

const inputFields = {
  name: { type: "text", label: "Name" },
  phoneNumber: { type: "text", label: "Phone number" },
  address: { type: "text", label: "Address" },
  contactPerson: { type: "text", label: "Contact person" },
  contactPersonPhoneNumber: {
    type: "text",
    label: "Contact person phone number",
  },
  email: { type: "text", label: "Email" },
  companyTypeId: { type: "select", label: "Company type" },
};

const companyService = new CompanyService();

const AddCompanyForm: React.FC<FormProps> = ({
  fetchData,
  defaultValues,
  isUpdate,
}) => {
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);

  useEffect(() => {
    companyService.getCompanyTypes().then((data: CompanyType[]) => {
      setCompanyTypes(data);
    });
  }, []);

  const options = {
    companyTypeId: companyTypes.map((companyType) => ({
      value: companyType.id,
      label: companyType.name,
    })),
  };

  return (
    <RecordForm
      schema={schema}
      inputFields={inputFields}
      fetchData={fetchData}
      isUpdate={isUpdate}
      defaultValues={defaultValues}
      addRecord={companyService.createCompany}
      updateRecord={companyService.updateCompany}
      options={options}
      recordType="Company"
    />
  );
};

export default AddCompanyForm;
