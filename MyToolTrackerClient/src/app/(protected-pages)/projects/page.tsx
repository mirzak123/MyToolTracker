"use client";

import * as React from "react";
import RecordTable from "@/components/RecordTable";
import { ProjectService } from "@/services/projectService";
import { Project } from "@/types/project";

import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import withAuth from "@/hoc/withAuth";
import SectionTitle from "@/components/SectionTitle";

// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "companyId", headerName: "Company ID", width: 130 },
  {
    field: "contractNumber",
    headerName: "Contract Number",
    sortable: false,
    width: 130,
  },
  { field: "year", headerName: "Year", width: 130 },
];

// Create an instance of the ProjectService
const projectService = new ProjectService();

const ProjectsPage = () => {
  // State to keep track of projects
  const [projects, setProjects] = React.useState<Project[]>([]);

  const fetchData = async () => {
    try {
      const data = await projectService.getProjects();
      console.log("Projects:", data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <SectionTitle title="Projects" />
      <Box sx={{ width: "90%" }}>
        <RecordTable
          records={projects}
          columns={columns}
          onDelete={projectService.deleteProject}
          fetchData={fetchData}
          recordType="Project"
        />
      </Box>
    </main>
  );
};

export default withAuth(ProjectsPage);
