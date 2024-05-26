import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import AuthProvider from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyToolTracker",
  description: "Internal tool tracking for small businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Navbar />
              <div style={{ display: "flex", flexGrow: 1 }}>
                <Sidebar />
                <div style={{ flexGrow: 1, paddingTop: "80px" }}>
                  {children}
                </div>
              </div>
            </div>
            );
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
