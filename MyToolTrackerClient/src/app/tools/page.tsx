'use client'

import * as React from 'react';
import AddToolForm from '@/components/AddToolForm';
import RecordTable from '@/components/RecordTable';
import { ToolService } from '@/services/toolService';
import { CategoryService } from '@/services/categoryService';
import { Tool } from '@/types/tool';

import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';


// Define columns for the DataGrid
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'model', headerName: 'Model', width: 130 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'toolStatus', headerName: 'Tool Status', width: 130 },
];

// Create an instance of the ToolService
const toolService = new ToolService();
// Create an instance of the CategoryService
const categoryService = new CategoryService();

// Define an interface for Tool with category and tool status
interface ToolWithCategoryAndStatus extends Tool {
  category: string;
  toolStatus: string;
}

const ToolsPage = () => {
  // State to keep track of tools
  const [tools, setTools] = React.useState<ToolWithCategoryAndStatus[]>([]);

  const fetchData = async () => {
    try {
      const data = await toolService.getTools();
      const toolCategories = await categoryService.getCategories();
      const toolStatuses = await toolService.getToolStatuses();

      // Map category and tool status ids to category and tool status names
      const toolsWithCategoryAndStatus: ToolWithCategoryAndStatus[] = data.map(tool => {
        const category = toolCategories.find(category => category.id === tool.categoryId);
        const toolStatus = toolStatuses.find(status => status.id === tool.toolStatusId);
        return {
          ...tool,
          category: category?.name || '',
          toolStatus: toolStatus?.name || '',
        };
      });

      setTools(toolsWithCategoryAndStatus);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Tools</h1>
      <Box sx={{ width: '90%' }} >
        <RecordTable
          records={tools}
          columns={columns}
          onDelete={toolService.deleteTool}
          fetchData={fetchData}
          recordType="Tool"
        />
      </Box>
    </main>
  );
}

export default ToolsPage;
