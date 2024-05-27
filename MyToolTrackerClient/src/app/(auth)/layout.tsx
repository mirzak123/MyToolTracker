import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import AuthProvider from "@/contexts/AuthContext";

export const metadata = {
  title: "MyToolTracker",
  description: "MyToolTracker is a tool tracking application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
