import { Typography } from "@mui/material";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        mt: 3,
        mb: 2,
        color: "primary.main",
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        borderBottom: "4px solid",
        borderColor: "primary.main",
        paddingBottom: "0.5em",
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
