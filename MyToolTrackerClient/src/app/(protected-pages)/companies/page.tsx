"use client";

import * as React from "react";
import RecordTable from "@/components/RecordTable";
import { CompanyService } from "@/services/companyService";
import { Company } from "@/types/company";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import withAuth from "@/hoc/withAuth";

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 130 },
  { field: "address", headerName: "Address", width: 150 },
  { field: "contactPerson", headerName: "Contact Person", width: 150 },
  {
    field: "contactPersonPhoneNumber",
    headerName: "Contact Person Phone Number",
    width: 250,
  },
  { field: "companyType", headerName: "Company Type", width: 130 },
];

// Create an instance of the CompanyService
const companyService = new CompanyService();

// Define an interface for Company with company type
interface CompanyWithType extends Company {
  companyType: string;
}

const CompaniesPage = () => {
  // State to keep track of companies
  const [companies, setCompanies] = React.useState<CompanyWithType[]>([]);

  const fetchData = async () => {
    try {
      const data = await companyService.getCompanies();
      const companyTypes = await companyService.getCompanyTypes();

      // Map company type ids to company type names
      const companiesWithType: CompanyWithType[] = data.map((company) => {
        const companyType = companyTypes.find(
          (companyType) => companyType.id === company.companyTypeId,
        );
        return {
          ...company,
          companyType: companyType?.name || "",
        };
      });

      setCompanies(companiesWithType);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Companies</h1>
      <Box sx={{ width: "90%" }}>
        <RecordTable
          records={companies}
          columns={columns}
          onDelete={companyService.deleteCompany}
          fetchData={fetchData}
          recordType="Company"
        />
      </Box>
    </main>
  );
};

export default withAuth(CompaniesPage);
