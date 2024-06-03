"use client";

import Box from "@mui/material/Box";
import CreateOrderRequestForm from "@/components/CreateOrderRequestForm";
import withAuth from "@/hoc/withAuth";

const CreateOrderRequestPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Create New Order Request</h1>
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <CreateOrderRequestForm fetchData={() => {}} />
      </Box>
    </main>
  );
};

export default withAuth(CreateOrderRequestPage);
