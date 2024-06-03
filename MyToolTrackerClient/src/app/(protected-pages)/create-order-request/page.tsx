"use client";

import Box from "@mui/material/Box";
import CreateOrderRequestForm from "@/components/CreateOrderRequestForm";
import withAuth from "@/hoc/withAuth";
import SectionTitle from "@/components/SectionTitle";

const CreateOrderRequestPage = () => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SectionTitle title="Create Order Request" />
      <Box sx={{ display: "flex", textAlign: "center", maxWidth: "60%" }}>
        <CreateOrderRequestForm fetchData={() => {}} />
      </Box>
    </main>
  );
};

export default withAuth(CreateOrderRequestPage);
