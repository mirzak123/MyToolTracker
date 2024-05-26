"use client";

import Box from "@mui/material/Box";
import AddToolForm from "@/components/AddToolForm";
import withAuth from "@/hoc/withAuth";

const AddToolPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Add Tool</h1>
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <AddToolForm />
      </Box>
    </main>
  );
};

export default withAuth(AddToolPage);
