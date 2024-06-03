"use client";

import Box from "@mui/material/Box";
import AddToolForm from "@/components/AddToolForm";
import withAuth from "@/hoc/withAuth";
import SectionTitle from "@/components/SectionTitle";

const AddToolPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SectionTitle title="Add Tool" />
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <AddToolForm />
      </Box>
    </main>
  );
};

export default withAuth(AddToolPage);
