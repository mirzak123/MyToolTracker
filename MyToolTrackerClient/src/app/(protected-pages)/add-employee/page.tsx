"use client";

import Box from "@mui/material/Box";
import AddEmployeeForm from "@/components/AddEmployeeForm";
import withAuth from "@/hoc/withAuth";
import SectionTitle from "@/components/SectionTitle";

const AddEmployeePage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SectionTitle title="Add Employee" />
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <AddEmployeeForm />
      </Box>
    </main>
  );
};

export default withAuth(AddEmployeePage);
