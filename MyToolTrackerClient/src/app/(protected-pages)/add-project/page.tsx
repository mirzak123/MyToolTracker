"use client";

import Box from "@mui/material/Box";
import AddProjectForm from "@/components/AddProjectForm";
import withAuth from "@/hoc/withAuth";
import SectionTitle from "@/components/SectionTitle";

const AddProjectPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SectionTitle title="Add Project" />
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <AddProjectForm />
      </Box>
    </main>
  );
};

export default withAuth(AddProjectPage);
