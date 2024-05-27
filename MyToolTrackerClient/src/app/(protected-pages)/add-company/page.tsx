"use client";

import Box from "@mui/material/Box";
import AddCompanyForm from "@/components/AddCompanyForm";
import withAuth from "@/hoc/withAuth";

const AddCompanyPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Add Company</h1>
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <AddCompanyForm />
      </Box>
    </main>
  );
};

export default withAuth(AddCompanyPage);
